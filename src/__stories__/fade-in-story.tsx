import * as React from 'react';
import FadeIn from '../fade-in';
import {StorySection} from './helpers';

export default {
    title: 'Components/Animations/FadeIn',
    component: FadeIn,
};

export const Default: StoryComponent = () => (
    <StorySection title="FadeIn transition">
        <FadeIn delay="1s">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id rutrum orci. Sed pulvinar
                aliquet nulla, sed lacinia dui egestas id. Donec lorem justo, dictum at malesuada a,
                condimentum ac libero. Aenean sollicitudin dictum velit, eu congue urna malesuada eget.
                Maecenas tempor tempor massa id rutrum. Nam nec quam blandit, blandit arcu ac, lacinia tortor.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                Integer blandit mollis auctor. Nullam in massa quis felis fermentum iaculis non a risus.
                Vivamus a lorem nec tortor posuere egestas. Proin varius imperdiet nibh vestibulum efficitur.
                Duis ac urna eu leo vehicula rhoncus id id odio.
            </p>
            <p>
                Integer auctor, lacus in luctus pretium, felis sapien vestibulum magna, sit amet laoreet est
                est vel leo. Etiam id metus vestibulum, venenatis lacus non, semper erat. Morbi molestie lacus
                vehicula eros posuere, eget pharetra sapien varius. Sed pulvinar accumsan justo, quis blandit
                libero iaculis ut. Curabitur eu dui sit amet ipsum scelerisque pharetra nec a ligula. Donec id
                tempor mi. Ut faucibus venenatis imperdiet. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Maecenas porta mauris fringilla enim cursus
                malesuada. Donec nec fermentum turpis, in facilisis turpis. Morbi commodo risus mauris, ac
                hendrerit ligula dapibus nec. Donec facilisis, ipsum nec lacinia ullamcorper, erat ipsum
                luctus dolor, vitae facilisis dolor lectus vitae nibh. Mauris fermentum mattis mollis. Sed
                eget lacus viverra, pellentesque eros non, sollicitudin erat.
            </p>
        </FadeIn>
    </StorySection>
);

Default.storyName = 'FadeIn';
