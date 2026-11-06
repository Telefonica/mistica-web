import {compileSsrClient} from '../ssr';

export default async (): Promise<void> => {
    await compileSsrClient({build: process.env.NO_BUILD !== 'true'});
};
