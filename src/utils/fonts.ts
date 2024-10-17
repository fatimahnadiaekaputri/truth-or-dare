import { Bangers, Carter_One, Tajawal } from 'next/font/google';

const bangers_init = Bangers({
    subsets: ['latin'],
    weight: ['400'],
});

const carter_one_init = Carter_One({
    subsets: ['latin'],
    weight: ['400'],
});

const tajawal_init = Tajawal({
    subsets: ['latin'],
    weight: ['200'],
});

export const bangers = bangers_init.className;
export const carter_one = carter_one_init.className;
export const tajawal = tajawal_init.className;