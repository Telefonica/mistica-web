import {ButtonLink, Circle, DataCard, Tag, skinVars} from '@telefonica/mistica';
import IconLightningRegular from '@telefonica/mistica-icons/icon-lightning-regular';
import IconStarRegular from '@telefonica/mistica-icons/icon-star-regular';

/**
 * The module that this remote exposes to the host. It renders components of the shared copy of
 * @telefonica/mistica, and two icons of @telefonica/mistica-icons.
 */
const PromoCard = () => (
    <DataCard
        asset={
            <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                <IconLightningRegular color={skinVars.colors.brand} />
            </Circle>
        }
        headline={<Tag type="promo">Remote</Tag>}
        title="A card from the remote"
        description="The components come from the shared scope, the icons from the icons package."
        buttonLink={
            <ButtonLink small onPress={() => {}} StartIcon={IconStarRegular}>
                Rate it
            </ButtonLink>
        }
    />
);

export default PromoCard;
