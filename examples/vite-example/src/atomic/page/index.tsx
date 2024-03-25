import {
  ButtonLink,
  ButtonPrimary,
  Carousel,
  Hero,
  Image,
  ResponsiveLayout,
} from "@telefonica/mistica";
import { CardItem } from "../molecule/cardItem";
import { Header } from "../molecule/header";

export const Main = () => {
  return (
    <>
      <Header />
      <ResponsiveLayout>
        <Hero
          background="default"
          desktopMediaPosition="right"
          media={
            <Image
              src="https://mistica-web.vercel.app/static/media/using-vr.ab536392.jpg"
              aspectRatio={"16:9"}
              height="100%"
            />
          }
          button={<ButtonPrimary fake>Action</ButtonPrimary>}
          buttonLink={<ButtonLink href="#">Action Link Example</ButtonLink>}
          pretitle={"Pretitle example"}
          title={"HERO TITLE"}
          description={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          }
          dataAttributes={{ testid: "hero" }}
        />
        <Carousel
          items={[<CardItem />, <CardItem />, <CardItem />, <CardItem />]}
        />
      </ResponsiveLayout>
    </>
  );
};
