// @flow
// See: https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_(IIN)
// Sample regexes: https://rgxdb.com/

export type CardOptions = {
    americanExpress?: boolean,
    visa?: boolean,
    masterCard?: boolean,
};

const getMatcher = (regex: RegExp) => (str?: string) => !!str && regex.test(str);

/**
 * Returns true if number looks like an American Express card
 * Do not use for validation
 */
export const isAmericanExpress: (str?: string) => boolean = getMatcher(/^3[47]/);

/**
 * Returns true if number looks like a Visa card
 * Do not use for validation
 */
export const isVisa: (str?: string) => boolean = getMatcher(/^4/);

/**
 * Returns true if number looks like a MasterCard card
 * Do not use for validation
 */
export const isMasterCard: (str?: string) => boolean = getMatcher(/^5/);

export const getCvvLength = (creditCardNumber: string): number =>
    isAmericanExpress(creditCardNumber) ? 4 : 3;

export const getCreditCardNumberLength = (creditCardNumber: string): number =>
    isAmericanExpress(creditCardNumber) ? 15 : 16;

export const isValidCreditCardNumber = (creditCardNumber: string): boolean => {
    if (
        !isAmericanExpress(creditCardNumber) &&
        !isMasterCard(creditCardNumber) &&
        !isVisa(creditCardNumber)
    ) {
        return false;
    }
    return getCreditCardNumberLength(creditCardNumber) === creditCardNumber.length;
};
