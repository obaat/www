import { space, color, width, fontSize } from 'styled-system'
import g from 'glamorous'

export const clickable = ({onClick}) => onClick && ({ cursor: "pointer" });
export const show = ({show}) => show || ({ display: "none" });
export const hoc = Component => g(Component)(space, color, width, fontSize, clickable);
