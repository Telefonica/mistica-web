import {test, expect} from '../test-utils/component';

test('happy case', async ({mount}) => {
    const handleSubmitSpyCalls: Array<Array<unknown>> = [];
    const handleSubmitSpy = (...args: Array<unknown>) => {
        handleSubmitSpyCalls.push(args);
    };

    const component = await mount('form/Scenario1', {handleSubmitSpy});
    await component.getByLabel('Username').pressSequentially('pepito');
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect
        .poll(() => handleSubmitSpyCalls)
        .toContainEqual([{username: 'pepito'}, {username: 'pepito'}]);
});
test('not submitting if required field is empty', async ({mount}) => {
    const handleSubmitSpyCalls: Array<Array<unknown>> = [];
    const handleSubmitSpy = (...args: Array<unknown>) => {
        handleSubmitSpyCalls.push(args);
    };

    const component = await mount('form/Scenario2', {handleSubmitSpy});
    await expect(component.getByText('Este campo es obligatorio')).toHaveCount(0);
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect(component.getByText('Este campo es obligatorio')).toHaveCount(1);
    await expect(handleSubmitSpyCalls).toEqual([]);
});
test('custom validator', async ({mount}) => {
    const handleSubmitSpyCalls: Array<Array<unknown>> = [];
    const handleSubmitSpy = (...args: Array<unknown>) => {
        handleSubmitSpyCalls.push(args);
    };

    const component = await mount('form/Scenario3', {handleSubmitSpy});
    await component.getByLabel('Password').pressSequentially('1234');
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect(await component.getByText('wrong password')).toHaveCount(1);
    await expect(handleSubmitSpyCalls).toEqual([]);
    await component.getByLabel('Password').fill('');
    await component.getByLabel('Password').pressSequentially('letmein');
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect
        .poll(() => handleSubmitSpyCalls)
        .toContainEqual([{password: 'letmein'}, {password: 'letmein'}]);
});
test('validation errors are shown onBlur by default', async ({mount}) => {
    const component = await mount('form/Scenario4');
    const nameField = component.getByLabel('Name', {exact: true});
    await nameField.focus();
    await nameField.blur();
    await expect(await component.getByText('Este campo es obligatorio')).toHaveCount(1);
});
test('validation errors are only shown onSubmit if validatieOnBlurInsideForm is false', async ({mount}) => {
    const component = await mount('form/Scenario5');
    const nameField = component.getByLabel('Name', {exact: true});
    await nameField.focus();
    await nameField.blur();
    await expect(component.getByText('Este campo es obligatorio')).toHaveCount(0);
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect(await component.getByText('Este campo es obligatorio')).toHaveCount(1);
});
test('when there are multiple errors on submit, the fields with error are anounced by screen reader', async ({
    mount,
}) => {
    const handleSubmitSpyCalls: Array<Array<unknown>> = [];
    const handleSubmitSpy = (...args: Array<unknown>) => {
        handleSubmitSpyCalls.push(args);
    };

    const component = await mount('form/Scenario6', {handleSubmitSpy});
    await component.getByLabel('Password').pressSequentially('letmein');
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect(component.getByText('Este campo es obligatorio')).toHaveCount(1);
    await expect(component.getByText('wrong password')).toHaveCount(1);
    const liveRegion = component.getByRole('alert');
    await expect(liveRegion).toHaveCount(1);
    await expect(liveRegion).toContainText('Revisa los siguientes errores: Username, Password');
});
test('fields are disabled during submit', async ({mount}) => {
    let resolveSubmitPromise: (value?: unknown) => void = () => {};
    const submitPromise = new Promise((r) => {
        resolveSubmitPromise = r;
    });

    const handleSubmitSpyCalls: Array<Array<unknown>> = [];
    const handleSubmitSpy = (...args: Array<unknown>) => {
        handleSubmitSpyCalls.push(args);
        return submitPromise;
    };

    const component = await mount('form/Scenario7', {handleSubmitSpy});
    await component.getByLabel('Username').pressSequentially('pepito');
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect(component.getByLabel('Username')).toBeDisabled();
    await expect(component.getByRole('button')).toBeDisabled();
    await expect(component.getByText('Submit').locator('xpath=ancestor::*[@aria-hidden="true"]')).toHaveCSS(
        'opacity',
        '0'
    );
    resolveSubmitPromise();
    await expect(component.getByLabel('Username')).not.toBeDisabled();
    await expect(component.getByRole('button', {name: 'Submit'})).toBeEnabled();
});
test('form with defaultValue in field', async ({mount}) => {
    const handleSubmitCalls: Array<Array<unknown>> = [];
    const handleSubmit = (...args: Array<unknown>) => {
        handleSubmitCalls.push(args);
    };

    const component = await mount('form/Scenario8', {handleSubmit});
    await component.getByRole('button', {name: 'Send'}).focus();
    await component.getByRole('button', {name: 'Send'}).click();
    await expect
        .poll(() => handleSubmitCalls)
        .toContainEqual([{email: 'foo@bar.com'}, {email: 'foo@bar.com'}]);
});
test('form with controlled field', async ({mount}) => {
    const handleSubmitCalls: Array<Array<unknown>> = [];
    const handleSubmit = (...args: Array<unknown>) => {
        handleSubmitCalls.push(args);
    };

    const component = await mount('form/Scenario9', {handleSubmit});
    await component.getByLabel('email1').pressSequentially('@bar.com');
    await component.getByRole('button', {name: 'Send'}).focus();
    await component.getByRole('button', {name: 'Send'}).click();
    await expect
        .poll(() => handleSubmitCalls)
        .toContainEqual([
            {email1: 'foo@bar.com', email2: 'foo@bar.com'},
            {email1: 'foo@bar.com', email2: 'foo@bar.com'},
        ]);
});
test('defaultValue in Field takes precedence over Form initialValues', async ({mount}) => {
    const handleSubmitCalls: Array<Array<unknown>> = [];
    const handleSubmit = (...args: Array<unknown>) => {
        handleSubmitCalls.push(args);
    };

    const component = await mount('form/Scenario10', {handleSubmit});
    await component.getByRole('button', {name: 'Send'}).focus();
    await component.getByRole('button', {name: 'Send'}).click();
    await expect
        .poll(() => handleSubmitCalls)
        .toContainEqual([
            {email: 'foo@bar.com', password: '12345678'},
            {email: 'foo@bar.com', password: '12345678'},
        ]);
});
test("if a Field is disabled we skip its validation and don't submit its value", async ({mount}) => {
    const handleSubmitCalls: Array<Array<unknown>> = [];
    const handleSubmit = (...args: Array<unknown>) => {
        handleSubmitCalls.push(args);
    };
    const validateCalls: Array<Array<unknown>> = [];
    const onValidate = (...args: Array<unknown>) => {
        validateCalls.push(args);
    };

    const component = await mount('form/Scenario11', {handleSubmit, onValidate});
    await component.getByLabel('password').pressSequentially('123456');
    await component.getByRole('button', {name: 'Send'}).focus();
    await component.getByRole('button', {name: 'Send'}).click();
    await expect.poll(() => handleSubmitCalls).toContainEqual([{password: '123456'}, {password: '123456'}]);
    await expect(validateCalls).toEqual([]);
});
test('can listen to form validation errors', async ({mount}) => {
    const onValidationErrorsSpyCalls: Array<Array<unknown>> = [];
    const onValidationErrorsSpy = (...args: Array<unknown>) => {
        onValidationErrorsSpyCalls.push(args);
    };

    const component = await mount('form/Scenario12', {onValidationErrorsSpy});
    await component.getByLabel('Name', {exact: true}).pressSequentially('Pepe');
    await component.getByLabel('Email').pressSequentially('invalidemail');
    await component.getByRole('button', {name: 'Submit'}).focus();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect
        .poll(() => onValidationErrorsSpyCalls)
        .toContainEqual([
            {
                email: 'Email incorrecto',
                surname: 'Este campo es obligatorio',
            },
        ]);
});
test('Disabling a field removes the error state and disabled fields are not submitted', async ({mount}) => {
    const submitSpyCalls: Array<Array<unknown>> = [];
    const submitSpy = (...args: Array<unknown>) => {
        submitSpyCalls.push(args);
    };

    const component = await mount('form/Scenario13', {submitSpy});
    const submitButton = await component.getByRole('button', {name: 'Submit'});
    const emailField = await component.getByLabel('Email');
    const phoneField = await component.getByLabel('Phone');
    await emailField.pressSequentially('bad-email');
    await submitButton.focus();
    await submitButton.click();
    await expect(component.getByText('Email incorrecto', {exact: true})).toHaveCount(1);
    await expect(submitSpyCalls).toEqual([]);
    await component.getByRole('switch').click();
    await expect(emailField).toBeDisabled();
    await expect(component.getByText('Email incorrecto')).toHaveCount(0);
    await phoneField.pressSequentially('654834455');
    await submitButton.focus();
    await submitButton.click();
    await expect
        .poll(() => submitSpyCalls)
        .toContainEqual([
            {phone: '654834455', switch: false},
            {phone: '654 83 44 55', switch: false},
        ]);
});
for (const platform of ['ios', 'android']) {
    for (const type of ['date', 'datetime-local', 'time', 'month', 'select', 'text']) {
        const expectedFocus = platform === 'android' || type === 'text';
        test(`autofocus on error - ${platform} ${type} ${expectedFocus}`, async ({mount}) => {
            const component = await mount('form/Autofocus', {platform, type});
            await component.getByRole('button', {name: 'Submit'}).click();
            const input = component.getByLabel('Field');
            if (expectedFocus) await expect(input).toBeFocused();
            else await expect(input).not.toBeFocused();
        });
    }
}
