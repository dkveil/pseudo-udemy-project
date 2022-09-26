import { size } from '../utils/media'

export const theme = {
    media: {
        tablet: `@media screen and (min-width: ${size.TABLET}px)`,
        desktop: `@media screen and (min-width: ${size.DESKTOP}px)`,
        large: `@media screen and (min-width: ${size.LARGE}px)`
    }
}