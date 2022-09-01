import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import classnames from 'classnames';
import ResponsiveLayout from './responsive-layout';
import Inline from './inline';
import Box from './box';
import Touchable from './touchable';
import {Text2, Text3} from './text';
import {useScreenSize, useTheme, useAriaId} from './hooks';
import {createUseStyles} from './jss';
import IconMenuRegular from './generated/mistica-icons/icon-menu-regular';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconButton from './icon-button';
import NegativeBox from './negative-box';
import {Row, RowList} from './list';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import FocusTrap from './focus-trap';
import {Portal} from './portal';
import GridLayout from './grid-layout';
import {useSetModalState} from './modal-context-provider';

import type {Props as TouchableProps} from './touchable';

type LogoProps = {size: number};

const MovistarLogo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M5.75989 5.73747C4.83318 5.7524 3.12261 6.21673 2.34128 9.45937C2.00085 10.8723 1.86931 12.3449 2.16077 14.0979C2.42943 15.7147 2.90545 17.1101 3.22629 17.8792C3.33689 18.1441 3.50812 18.4206 3.6405 18.5906C4.02129 19.0797 4.65503 19.0484 4.92132 18.9151C5.2116 18.7699 5.54527 18.4194 5.42453 17.6187C5.36611 17.2319 5.19775 16.666 5.10302 16.3515C4.81224 15.3863 4.42521 14.2216 4.39143 13.392C4.34635 12.2823 4.77695 12.1369 5.06283 12.0731C5.54375 11.9655 5.94682 12.5021 6.3298 13.1746C6.78691 13.9771 7.57026 15.3991 8.20924 16.4853C8.78607 17.4658 9.85057 18.5156 11.5601 18.4436C13.303 18.3703 14.5877 17.6946 15.2494 15.5671C15.7447 13.9756 16.0823 12.7863 16.6255 11.5683C17.2501 10.1677 18.0833 9.41801 18.7849 9.64692C19.4364 9.85935 19.599 10.5064 19.6067 11.4576C19.6137 12.2989 19.5179 13.2264 19.4435 13.9078C19.4164 14.1551 19.3675 14.6525 19.3874 14.9286C19.4267 15.4715 19.6581 16.0138 20.2597 16.1006C20.9006 16.1929 21.4148 15.6725 21.6201 15.0434C21.7011 14.7955 21.7702 14.4161 21.8075 14.1468C21.9958 12.7873 22.0446 11.8735 21.9598 10.4824C21.8604 8.85587 21.5471 7.3726 21.0007 6.08889C20.4779 4.8613 19.6382 4.07454 18.5612 4.00504C17.369 3.92817 16.0009 4.73192 15.2832 6.29138C14.6216 7.72883 14.0924 9.20455 13.7714 9.95768C13.4458 10.7214 12.9673 11.1921 12.2315 11.2709C11.332 11.367 10.5569 10.7034 9.98921 9.75726C9.49428 8.93257 8.51336 7.3623 7.98853 6.83465C7.49546 6.33891 6.9323 5.71859 5.75989 5.73747Z" />
        </svg>
    );
};

const VivoLogo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg height={size} viewBox="0 0 65 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.79205 20.4766H8.85203C9.02869 20.4766 9.71572 20.385 10.0887 19.6979L14.4725 11.9248C14.924 11.1003 14.394 10.4002 13.9229 10.2301L12.7583 9.70664C12.1301 9.42529 11.3777 9.71973 11.0898 10.3806L8.33512 15.916H8.29587L5.54777 10.3806C5.26641 9.72627 4.50742 9.42529 3.88582 9.70664L2.72115 10.2301C2.25005 10.4002 1.72006 11.1003 2.17153 11.9248L6.56195 19.6979C6.9349 20.385 7.61539 20.4766 7.79205 20.4766Z" />
            <path d="M27.068 20.4766H28.128C28.3046 20.4766 28.9917 20.385 29.3646 19.6979L33.755 11.9248C34.2065 11.1003 33.6765 10.4002 33.2054 10.2301L32.0408 9.70664C31.4126 9.42529 30.6602 9.71973 30.3788 10.3806L27.6242 15.916H27.5849L24.8303 10.3806C24.5489 9.72627 23.7899 9.42529 23.1683 9.70664L22.0036 10.2301C21.5325 10.4002 21.0026 11.1003 21.454 11.9248L25.8379 19.6979C26.2043 20.385 26.8913 20.4766 27.068 20.4766Z" />
            <path d="M39.9383 9.63467C36.9154 9.63467 34.4617 12.0883 34.4617 15.1112C34.4617 18.1341 36.9154 20.5878 39.9383 20.5878C42.9612 20.5878 45.4148 18.1341 45.4148 15.1112C45.4148 12.0883 42.9677 9.63467 39.9383 9.63467ZM39.9383 17.2705C38.7474 17.2705 37.779 16.3021 37.779 15.1112C37.779 13.9204 38.7474 12.952 39.9383 12.952C41.1291 12.952 42.0975 13.9204 42.0975 15.1112C42.104 16.3021 41.1357 17.2705 39.9383 17.2705Z" />
            <path d="M20.1061 6.52011C20.1061 7.70441 19.1443 8.66625 17.96 8.66625C16.7757 8.66625 15.8139 7.70441 15.8139 6.52011C15.8139 5.33581 16.7757 4.37398 17.96 4.37398C19.1443 4.37398 20.1061 5.33581 20.1061 6.52011Z" />
            <path d="M16.0887 11.0742C16.0887 10.3414 16.6776 9.75248 17.4104 9.75248H18.5162C19.249 9.75248 19.8379 10.3414 19.8379 11.0742V19.1549C19.8379 19.8877 19.2425 20.4766 18.5162 20.4766H17.4104C16.6776 20.4766 16.0887 19.8877 16.0887 19.1549V11.0742Z" />
            <path d="M59.6395 6.51364C59.6395 7.18758 59.3974 8.24756 58.658 8.98693C58.3963 9.24865 58.1673 9.40569 57.9841 9.52346C57.6373 9.75247 57.3821 9.9095 57.5196 10.289C57.657 10.662 58.0888 10.5442 58.501 10.4526C58.6319 10.4199 61.2033 9.80482 61.236 9.80482C61.9231 9.67395 62.5905 10.1123 62.754 10.7863C62.754 10.7863 62.9569 11.65 62.9634 11.6565C63.127 12.3304 62.7279 13.024 62.0539 13.2203C62.0277 13.2334 59.2208 13.9073 59.2142 13.9073C58.6842 14.0447 58.3702 14.3065 58.3702 14.8234C58.3702 15.0524 58.501 15.301 58.6646 15.5104C58.6646 15.5104 61.7137 19.2923 61.7268 19.3185C62.139 19.8877 62.0343 20.6729 61.4978 21.1113C61.4978 21.1113 60.8107 21.6674 60.8042 21.674C60.2676 22.1124 59.4694 22.0535 59.0048 21.53C58.9787 21.5104 57.0877 19.1811 56.8849 18.9324C56.682 18.6838 56.4334 18.3108 56.0801 18.3108C55.7267 18.3108 55.4781 18.6838 55.2753 18.9324C55.0724 19.1811 53.1815 21.5039 53.1553 21.53C52.6842 22.0535 51.8925 22.1124 51.356 21.674C51.3494 21.6674 50.6624 21.1113 50.6624 21.1113C50.1259 20.6729 50.0146 19.8812 50.4334 19.3185C50.4465 19.2923 53.4956 15.5104 53.4956 15.5104C53.6591 15.301 53.79 15.0524 53.79 14.8234C53.79 14.3065 53.4759 14.0447 52.9459 13.9073C52.9394 13.9073 50.1324 13.2334 50.1062 13.2203C49.4323 13.024 49.0397 12.3304 49.1967 11.6565C49.1967 11.65 49.4061 10.7928 49.4061 10.7863C49.5697 10.1123 50.2371 9.67395 50.9241 9.80482C50.9568 9.80482 53.5217 10.4199 53.6591 10.4526C54.0713 10.5442 54.5032 10.662 54.6406 10.289C54.7845 9.9095 54.5294 9.75247 54.176 9.52346C53.9928 9.40569 53.7704 9.24865 53.5086 8.98693C52.7627 8.24102 52.5206 7.18758 52.5206 6.51364C52.5206 4.57689 54.1368 3 56.0801 3C58.0234 3 59.6395 4.57034 59.6395 6.51364Z" />
        </svg>
    );
};

const O2Logo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5488 16.0335C21.8424 16.1065 22.1266 16.2415 22.3388 16.4558C22.5183 16.6276 22.6411 16.8499 22.7127 17.0838C22.7977 17.3731 22.8193 17.6803 22.7802 17.9787C22.7429 18.2479 22.6501 18.5075 22.5284 18.7511C22.2997 19.1992 21.9805 19.5965 21.6394 19.9683C21.2723 20.3662 20.8766 20.738 20.4814 21.1094C21.2777 21.1069 22.074 21.1092 22.8703 21.1081C22.9135 21.1077 22.9576 21.1055 23 21.1167V22.0552C22.9759 22.0582 22.952 22.0614 22.9283 22.0624L18.8838 22.0622V21.0511C18.9759 20.9616 19.0743 20.8788 19.1687 20.7915C19.5786 20.4276 19.9825 20.0567 20.3632 19.6636C20.7294 19.2771 21.0861 18.873 21.3411 18.4066C21.4566 18.1876 21.5534 17.9491 21.5517 17.6993C21.5505 17.5207 21.4843 17.341 21.3574 17.2104C21.1927 17.0367 20.9529 16.9489 20.716 16.9204C20.3962 16.887 20.0733 16.9517 19.7757 17.0638C19.546 17.1486 19.3328 17.2686 19.1242 17.3931C19.0916 17.0571 19.0577 16.7212 19.0264 16.385C19.5388 16.1368 20.1029 15.987 20.6754 15.9608C20.9677 15.9438 21.2639 15.965 21.5488 16.0335ZM14.8405 5.31598C15.4058 5.52592 15.9429 5.8091 16.4281 6.16147C17.2361 6.74433 17.8939 7.51825 18.3477 8.39085C18.7702 9.19553 19.0213 10.0802 19.1223 10.9769C19.1704 11.4267 19.1906 11.8802 19.1648 12.332C19.1295 13.0499 18.99 13.7632 18.7481 14.4425C18.3674 15.5124 17.7227 16.4967 16.8652 17.2645C16.0449 18.0046 15.0307 18.537 13.947 18.8055C13.1523 19.0037 12.3237 19.0655 11.5063 19.0057C10.6758 18.9451 9.85411 18.7488 9.09547 18.4127C8.21888 18.0263 7.43007 17.4539 6.79756 16.7483C6.02182 15.8873 5.48168 14.8334 5.21175 13.7205C5.07973 13.1805 5.01279 12.6264 5 12.0718V11.7823C5.01178 11.3188 5.05344 10.8555 5.13963 10.3991C5.34506 9.29686 5.79973 8.23067 6.51039 7.34507C7.05786 6.65781 7.75545 6.08488 8.54283 5.67338C9.55445 5.14127 10.703 4.87849 11.8491 4.8504C12.8638 4.81979 13.89 4.96278 14.8405 5.31598ZM11.7686 6.88536C11.3519 6.91848 10.939 7.01031 10.5534 7.16896C10.1453 7.33515 9.76806 7.57136 9.43995 7.86C9.02852 8.21991 8.69266 8.65754 8.43365 9.13235C8.03931 9.85652 7.81866 10.665 7.75717 11.4807C7.72184 11.96 7.74281 12.4429 7.81421 12.9184C7.90715 13.527 8.08442 14.1256 8.36283 14.679C8.59899 15.1493 8.90986 15.5869 9.2996 15.9492C9.7116 16.3365 10.2151 16.6312 10.7604 16.8024C11.2601 16.9599 11.7902 17.0181 12.3138 16.9961C12.8009 16.9736 13.287 16.8782 13.7364 16.6911C14.4144 16.4136 14.9922 15.9302 15.4118 15.3457C15.9534 14.5939 16.259 13.6989 16.3791 12.7929C16.5377 11.6104 16.3647 10.3777 15.831 9.29994C15.592 8.82345 15.2831 8.37604 14.8943 8.00284C14.4766 7.59023 13.9621 7.26917 13.3989 7.08034C12.8773 6.90381 12.3181 6.84622 11.7686 6.88536Z" />
        </svg>
    );
};

const TelefonicaLogo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg height={size} viewBox="0 0 65 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M4.18502 9.37005C5.39177 9.37005 6.37004 8.39178 6.37004 7.18503C6.37004 5.97828 5.39177 5.00001 4.18502 5.00001C2.97827 5.00001 2 5.97828 2 7.18503C2 8.39178 2.97827 9.37005 4.18502 9.37005Z" />
            <path d="M9.31939 9.37004C10.5261 9.37004 11.5044 8.39177 11.5044 7.18502C11.5044 5.97827 10.5261 5 9.31939 5C8.11263 5 7.13437 5.97827 7.13437 7.18502C7.13437 8.39177 8.11263 9.37004 9.31939 9.37004Z" />
            <path d="M14.4544 9.37004C15.6611 9.37004 16.6394 8.39177 16.6394 7.18502C16.6394 5.97827 15.6611 5 14.4544 5C13.2476 5 12.2693 5.97827 12.2693 7.18502C12.2693 8.39177 13.2476 9.37004 14.4544 9.37004Z" />
            <path d="M9.31939 14.505C10.5261 14.505 11.5044 13.5268 11.5044 12.32C11.5044 11.1133 10.5261 10.135 9.31939 10.135C8.11263 10.135 7.13437 11.1133 7.13437 12.32C7.13437 13.5268 8.11263 14.505 9.31939 14.505Z" />
            <path d="M9.31939 19.64C10.5261 19.64 11.5044 18.6617 11.5044 17.455C11.5044 16.2482 10.5261 15.2699 9.31939 15.2699C8.11263 15.2699 7.13437 16.2482 7.13437 17.455C7.13437 18.6617 8.11263 19.64 9.31939 19.64Z" />
            <path d="M21.2967 10.6169H19.263V9.4054H24.5962V10.6169H22.557V16.1923H21.2967V10.6169Z" />
            <path d="M28.8498 14.738C28.743 15.126 28.1324 16.2893 26.5714 16.2893C25.1172 16.2893 24.0503 15.223 24.0503 13.72C24.0503 12.2169 25.1172 11.1506 26.5714 11.1506C27.9287 11.1506 28.9955 12.2169 28.9955 13.623C28.9932 13.7398 28.9834 13.8563 28.9663 13.9719L28.9467 14.1079H25.2623C25.3691 14.796 25.8827 15.2712 26.5714 15.2712C27.1436 15.2712 27.4925 14.9418 27.5895 14.738H28.8498ZM27.7835 13.2838C27.6767 12.6531 27.2595 12.1687 26.5714 12.1687C25.8345 12.1687 25.4075 12.6531 25.2623 13.2838H27.7835Z" />
            <path d="M29.7221 9.4054H30.9341V16.1923H29.7221V9.4054Z" />
            <path d="M36.4601 14.738C36.3534 15.126 35.7428 16.2893 34.1812 16.2893C32.7269 16.2893 31.6606 15.223 31.6606 13.72C31.6606 12.2169 32.7269 11.1506 34.1812 11.1506C35.539 11.1506 36.6053 12.2169 36.6053 13.623C36.6029 13.7398 36.5932 13.8563 36.576 13.9719L36.5571 14.1079H32.8721C32.9788 14.796 33.4931 15.2712 34.1812 15.2712C34.7533 15.2712 35.1023 14.9418 35.1992 14.738H36.4601ZM35.3932 13.2838C35.2865 12.6531 34.8698 12.1687 34.1812 12.1687C33.4443 12.1687 33.0179 12.6531 32.8721 13.2838H35.3932Z" />
            <path d="M37.7198 12.4109H36.8957V11.2476H37.7198V10.5199C37.7198 9.78301 38.1949 9.30782 38.9318 9.30782H39.9987V10.3747H39.271C39.2261 10.3735 39.1814 10.3815 39.1397 10.3981C39.098 10.4148 39.0601 10.4397 39.0283 10.4714C38.9966 10.5031 38.9716 10.541 38.9549 10.5827C38.9382 10.6243 38.9301 10.669 38.9312 10.7139V11.2476H39.9981V12.4109H38.9312V16.1929H37.7192L37.7198 12.4109Z" />
            <path d="M45.2222 13.723C45.2222 15.2261 44.1553 16.2923 42.701 16.2923C41.2468 16.2923 40.1799 15.223 40.1799 13.723C40.1799 12.223 41.2468 11.1537 42.701 11.1537C44.1553 11.1537 45.2222 12.2169 45.2222 13.723ZM44.0101 13.723C44.0101 12.8501 43.4281 12.2688 42.701 12.2688C41.9739 12.2688 41.392 12.8501 41.392 13.723C41.392 14.5959 41.9739 15.1773 42.701 15.1773C43.4281 15.1773 44.0101 14.5929 44.0101 13.723Z" />
            <path d="M45.9487 11.2476H47.0637L47.1607 11.7356H47.2089C47.305 11.6239 47.4161 11.526 47.5389 11.4447C47.8455 11.2486 48.203 11.1474 48.5668 11.1537C49.6819 11.1537 50.506 11.9778 50.506 13.2381V16.1953H49.2939V13.332C49.2939 12.7019 48.8577 12.2657 48.227 12.2657C47.5963 12.2657 47.1607 12.7019 47.1607 13.332V16.1923H45.9487V11.2476Z" />
            <path d="M58.22 14.3501C58.0651 15.126 57.4545 16.2893 55.8929 16.2893C54.4386 16.2893 53.3724 15.223 53.3724 13.72C53.3724 12.2169 54.4386 11.1506 55.8929 11.1506C57.4545 11.1506 58.0651 12.3139 58.22 13.0416H57.0086C56.9018 12.7604 56.6206 12.2663 55.8929 12.2663C55.1651 12.2663 54.582 12.847 54.582 13.723C54.582 14.599 55.1639 15.1772 55.891 15.1772C56.6182 15.1772 56.9 14.6929 57.0067 14.3531L58.22 14.3501Z" />
            <path d="M61.8849 15.7079H61.8367C61.7391 15.8217 61.6245 15.9196 61.497 15.9983C61.1772 16.1964 60.8068 16.2975 60.4307 16.2893C59.3058 16.2893 58.6367 15.6012 58.6367 14.7868C58.6367 13.8169 59.3156 13.1398 60.6728 13.1398H61.7879V13.0429C61.7879 12.5 61.4585 12.1218 60.915 12.1218C60.3715 12.1218 60.0909 12.4713 60.0427 12.7525H58.8306C58.9374 11.9375 59.5968 11.1525 60.915 11.1525C62.1759 11.1525 63 11.9863 63 13.0435V16.1947H61.9819L61.8849 15.7079ZM61.7879 14.0609H60.7698C60.1397 14.0609 59.8487 14.3049 59.8487 14.6917C59.8487 15.0784 60.1299 15.3218 60.6247 15.3218C61.3615 15.3218 61.7879 14.8948 61.7879 14.2067V14.0609Z" />
            <path d="M51.4338 11.2476H52.6459V16.1923H51.4338V11.2476Z" />
            <path d="M52.0395 10.537C52.4357 10.537 52.7569 10.2158 52.7569 9.81961C52.7569 9.42342 52.4357 9.10225 52.0395 9.10225C51.6433 9.10225 51.3221 9.42342 51.3221 9.81961C51.3221 10.2158 51.6433 10.537 52.0395 10.537Z" />
            <path d="M43.1372 9.16265H44.398L43.2342 10.5687H42.2161L43.1372 9.16265Z" />
        </svg>
    );
};

const BlauLogo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg height={size} viewBox="0 0 46 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M44 17.7136H2V21.1579H44V17.7136Z" fill="#7814B3" />
            <path d="M12.2457 8.43669C13.6936 8.99523 14.4628 9.94348 14.375 11.5594C14.2871 13.6623 12.649 15.1171 10.5044 15.1171H2.21745V11.857H3.38314V6.10359H2.21745V2.84271H10.5393C12.3531 2.84271 13.8019 4.38617 13.7465 6.20933C13.7277 7.18998 13.2067 8.10497 12.2457 8.43669ZM8.48338 5.8256H7.3987V7.55325H8.48338C9.55187 7.55325 9.6235 5.8256 8.48338 5.8256ZM9.84777 11.0444C9.84777 10.543 9.52458 10.0441 8.77843 10.0441H7.39784V12.0446H8.77758C9.50411 12.0455 9.84777 11.5526 9.84777 11.0444Z" />
            <path d="M14.7007 2.84272V6.10359H15.8553V15.1171H20.0738V2.84272H14.7007Z" />
            <path d="M32.2177 15.117H28.261L28.174 14.2063C27.5285 14.9951 26.5691 15.2748 25.6652 15.2936C19.6662 15.3635 19.6662 5.4052 25.6652 5.47341C26.5691 5.47341 27.5285 5.75397 28.174 6.54275L28.261 5.62946H32.2177V15.117ZM28.018 10.3818C28.018 8.54072 25.4214 8.55948 25.4214 10.3818C25.4214 12.2066 28.018 12.2246 28.018 10.3818Z" />
            <path d="M43.7732 5.62948H39.5905V10.751C39.5905 11.4528 39.0669 11.7854 38.5442 11.7854C38.0189 11.7854 37.6011 11.4366 37.6011 10.7689V5.62948H33.4158V10.7886C33.4158 13.3314 34.4092 15.2245 37.2173 15.2936C38.1408 15.3106 39.1019 15.0122 39.7619 14.1705L39.8506 15.1171L43.774 15.123L43.7732 5.62948Z" />
        </svg>
    );
};

type NavigationBarLogoProps = {
    size?: number;
    children?: undefined;
};

export const NavigationBarLogo: React.FC<NavigationBarLogoProps> = ({size}) => {
    const {skinName} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();
    size = size ?? (isTabletOrSmaller ? 40 : 48);
    switch (skinName) {
        case 'Movistar':
            return <MovistarLogo size={size} />;
        case 'Vivo':
            return <VivoLogo size={size} />;
        case 'O2':
        case 'O2-classic':
            return <O2Logo size={size} />;
        case 'Telefonica':
            return <TelefonicaLogo size={size} />;
        case 'Blau':
            return <BlauLogo size={size} />;
        default:
            return null;
    }
};

const useBurgerStyles = createUseStyles(() => ({
    burgerIconContainer: {
        position: 'relative',
        width: 24,
        height: 24,
        '& > *': {
            position: 'absolute',
            opacity: 1,
            transform: 'rotate(0) scale(1)',
            transition: 'transform 300ms, opacity 100ms',
        },
    },
    iconCloseHidden: {
        opacity: 0,
        transform: 'rotate(-45deg) scale(0.9)',
    },
    iconMenuHidden: {
        opacity: 0,
        transform: 'rotate(0deg) scale(0.7)',
    },
}));

const BurgerMenuIcon = ({isOpen}: {isOpen: boolean}) => {
    const classes = useBurgerStyles();
    return (
        <div className={classes.burgerIconContainer} role="presentation">
            <div className={isOpen ? '' : classes.iconCloseHidden}>
                <IconCloseRegular />
            </div>
            <div className={isOpen ? classes.iconMenuHidden : ''}>
                <IconMenuRegular />
            </div>
        </div>
    );
};

const NAVBAR_ZINDEX = 25;
const BURGER_ZINDEX = 26;

const DESKTOP_NAVBAR_HEIGHT = 80;
const MOBILE_NAVBAR_HEIGHT = 56;

const BURGER_MENU_ANIMATION_DURATION_MS = 300;

const useStyles = createUseStyles((theme) => {
    const shadowAlpha = theme.isDarkMode ? 1 : 0.2;

    return {
        topFixed: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: NAVBAR_ZINDEX,
        },
        notFixedPadding: {
            width: '100%',
            padding: ({paddingX}) => `0 ${paddingX}px`,
        },
        navbar: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            background: ({isInverse}) =>
                isInverse ? theme.colors.navigationBarBackground : theme.colors.background,
            height: DESKTOP_NAVBAR_HEIGHT,
            padding: '16px 0',
            borderBottomStyle: 'solid',
            borderBottomWidth: ({withBorder}) => (withBorder ? 1 : 0),
            borderColor: ({isInverse}) =>
                isInverse && !theme.isDarkMode ? 'transparent' : theme.colors.divider,
            [theme.mq.tabletOrSmaller]: {
                transition: 'border-color 300ms',
                borderColor: ({isMenuOpen, isInverse}) =>
                    isMenuOpen || (isInverse && !theme.isDarkMode) ? 'transparent' : theme.colors.divider,
                height: MOBILE_NAVBAR_HEIGHT,
                padding: '8px 0',
            },
        },
        section: {
            height: DESKTOP_NAVBAR_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            borderBottom: `2px solid transparent`,
            transition: 'border-color 300ms ease-in-out',

            [theme.mq.supportsHover]: {
                '&:hover span': {
                    color: ({isInverse}) =>
                        isInverse ? theme.colors.textSecondaryInverse : theme.colors.textSecondary,
                },
            },
        },
        selectedSection: {
            borderColor: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.controlActivated),
        },
        spacer: {
            height: DESKTOP_NAVBAR_HEIGHT,
            [theme.mq.tabletOrSmaller]: {
                height: MOBILE_NAVBAR_HEIGHT,
            },
        },
        burgerMenu: {
            zIndex: BURGER_ZINDEX,
            position: 'fixed',
            top: MOBILE_NAVBAR_HEIGHT,
            left: 0,
            right: 0,
            height: `calc(100vh - ${MOBILE_NAVBAR_HEIGHT}px)`,
            overflowY: 'auto',
            background: theme.colors.background,
            boxShadow: ({menuTransitionState}) =>
                menuTransitionState !== 'closed' ? `6px 0 4px -4px rgba(0, 0, 0, ${shadowAlpha})` : 'none',
            transition: `transform ${BURGER_MENU_ANIMATION_DURATION_MS}ms ease-out`,
        },
        burgerMenuEnter: {
            transform: 'translate(-100vw)',
        },
        burgerMenuEnterActive: {
            transform: 'translate(0)',
        },
        burgerMenuExit: {
            transform: 'translate(0)',
        },
        burgerMenuExitActive: {
            transform: 'translate(-100vw)',
        },
        iconButton: {
            color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralHigh),
            [theme.mq.supportsHover]: {
                '&:hover': {
                    color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralMedium),
                },
            },
        },
    };
});

type MainNavigationBarSection =
    | {href: string; to?: undefined; onPress?: undefined; title: string}
    | {to: string; href?: undefined; onPress?: undefined; title: string}
    | {onPress: () => void; to?: undefined; href?: undefined; title: string};

type MainNavigationBarProps = {
    sections: Array<MainNavigationBarSection>;
    selectedIndex?: number;
    right?: React.ReactElement;
    logo?: React.ReactElement;
    isInverse?: boolean;
    children?: undefined;
    topFixed?: boolean;
};

type MenuTransitionState = 'closed' | 'opening' | 'open' | 'closing';

export const MainNavigationBar: React.FC<MainNavigationBarProps> = ({
    sections,
    selectedIndex,
    right,
    logo,
    isInverse = false,
    topFixed = true,
}) => {
    const {texts} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuTransitionState, setMenuTransitionState] = React.useState<MenuTransitionState>('closed');
    const menuId = useAriaId();
    const classes = useStyles({isMenuOpen, isInverse, menuTransitionState, withBorder: true});
    const {isTabletOrSmaller} = useScreenSize();
    const setModalState = useSetModalState();

    logo = logo ?? <NavigationBarLogo />;

    if (isTabletOrSmaller) {
        const openMenu = () => {
            setIsMenuOpen(true);
            setModalState({isModalOpen: true});
        };

        const closeMenu = () => {
            setIsMenuOpen(false);
            setModalState({isModalOpen: false});
        };

        const disableFocusTrap = menuTransitionState !== 'open';

        return (
            <>
                <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                    <header>
                        <ThemeVariant isInverse={isInverse}>
                            <div className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                                <ResponsiveLayout>
                                    <Inline space="between" alignItems="center">
                                        <Inline space={24} alignItems="center">
                                            <IconButton
                                                aria-live="polite"
                                                aria-label={
                                                    isMenuOpen
                                                        ? texts.closeNavigationMenu
                                                        : texts.openNavigationMenu
                                                }
                                                aria-expanded={isMenuOpen}
                                                aria-controls={menuId}
                                                onPress={isMenuOpen ? closeMenu : openMenu}
                                            >
                                                <BurgerMenuIcon isOpen={isMenuOpen} />
                                            </IconButton>
                                            {logo}
                                        </Inline>
                                        {right}
                                    </Inline>
                                </ResponsiveLayout>
                            </div>
                        </ThemeVariant>
                        {topFixed && <div className={classes.spacer} />}
                    </header>
                </FocusTrap>
                <Portal>
                    <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                        <CSSTransition
                            onEntering={() => {
                                setMenuTransitionState('opening');
                            }}
                            onEntered={() => {
                                setMenuTransitionState('open');
                            }}
                            onExiting={() => {
                                setMenuTransitionState('closing');
                            }}
                            onExited={() => {
                                setMenuTransitionState('closed');
                            }}
                            in={isMenuOpen}
                            timeout={BURGER_MENU_ANIMATION_DURATION_MS}
                            classNames={{
                                enter: classes.burgerMenuEnter,
                                enterActive: classes.burgerMenuEnterActive,
                                exit: classes.burgerMenuExit,
                                exitActive: classes.burgerMenuExitActive,
                            }}
                            unmountOnExit
                        >
                            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                            <nav
                                className={classes.burgerMenu}
                                id={menuId}
                                onClick={() => {
                                    // Capture bubbling click events to close the burger menu when any row is pressed
                                    closeMenu();
                                }}
                            >
                                <ResponsiveLayout>
                                    <NegativeBox>
                                        <RowList>
                                            {sections.map((section, index) => (
                                                <Row key={index} {...section} />
                                            ))}
                                        </RowList>
                                    </NegativeBox>
                                </ResponsiveLayout>
                            </nav>
                        </CSSTransition>
                    </FocusTrap>
                </Portal>
            </>
        );
    }

    return (
        <ThemeVariant isInverse={isInverse}>
            <header className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                <ResponsiveLayout>
                    <Inline space="between" alignItems="center">
                        <Inline space={48} alignItems="center">
                            {logo}
                            <nav>
                                <Inline space={32}>
                                    {sections.map(({title, ...touchableProps}, idx) => (
                                        <Touchable
                                            {...touchableProps}
                                            key={idx}
                                            className={classnames(classes.section, {
                                                [classes.selectedSection]: idx === selectedIndex,
                                            })}
                                        >
                                            <Text3 regular>{title}</Text3>
                                        </Touchable>
                                    ))}
                                </Inline>
                            </nav>
                        </Inline>
                        {right}
                    </Inline>
                </ResponsiveLayout>
            </header>
            {topFixed && <div className={classes.spacer} />}
        </ThemeVariant>
    );
};

interface NavigationBarCommonProps {
    isInverse?: boolean;
    onBack?: () => void;
    title?: string;
    right?: React.ReactElement;
    withBorder?: boolean;
    children?: undefined;
}

interface NavigationBarTopFixedProps extends NavigationBarCommonProps {
    topFixed?: true;
    paddingX?: undefined;
}

interface NavigationBarNotFixedProps extends NavigationBarCommonProps {
    topFixed: false;
    paddingX?: number;
}

type NavigationBarProps = NavigationBarTopFixedProps | NavigationBarNotFixedProps;

export const NavigationBar: React.FC<NavigationBarProps> = ({
    onBack,
    title,
    right,
    isInverse = false,
    topFixed = true,
    paddingX,
    withBorder = true,
}) => {
    const {texts} = useTheme();
    const classes = useStyles({isInverse, paddingX: paddingX ?? 0, withBorder});
    const content = (
        <Inline space="between" alignItems="center">
            <Inline space={24} alignItems="center">
                {onBack && (
                    <IconButton
                        aria-label={texts.backNavigationBar}
                        onPress={onBack}
                        className={classes.iconButton}
                    >
                        <IconChevronLeftRegular color="currentColor" />
                    </IconButton>
                )}
                <Text3 regular truncate>
                    {title}
                </Text3>
            </Inline>
            <Box paddingLeft={24}>{right}</Box>
        </Inline>
    );
    return (
        <ThemeVariant isInverse={isInverse}>
            <header className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                {topFixed ? (
                    <ResponsiveLayout>{content}</ResponsiveLayout>
                ) : (
                    <div className={classes.notFixedPadding}>{content}</div>
                )}
            </header>
            {topFixed && <div className={classes.spacer} />}
        </ThemeVariant>
    );
};

type FunnelNavigationBarProps = {
    isInverse?: boolean;
    logo?: React.ReactElement;
    right?: React.ReactElement;
    topFixed?: boolean;
    children?: undefined;
};

export const FunnelNavigationBar: React.FC<FunnelNavigationBarProps> = ({
    logo,
    right,
    isInverse = false,
    topFixed = true,
}) => {
    const classes = useStyles({isInverse, withBorder: true});
    return (
        <ThemeVariant isInverse={isInverse}>
            <header className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                <ResponsiveLayout>
                    <GridLayout template="10">
                        <Inline space="between" alignItems="center">
                            {logo ?? <NavigationBarLogo />}
                            {right}
                        </Inline>
                    </GridLayout>
                </ResponsiveLayout>
            </header>
            {topFixed && <div className={classes.spacer} />}
        </ThemeVariant>
    );
};

const useNavigationBarActionGroupStyles = createUseStyles(() => ({
    lineHeightFix: {
        // This fixes vertical alignment issues with icons in the secondary navigation, because mistica icons
        // use display inline and other components like Badge use inline-block.
        lineHeight: 0,
    },
}));

type NavigationBarActionGroupProps = {
    children: React.ReactNode;
};

export const NavigationBarActionGroup: React.FC<NavigationBarActionGroupProps> = ({children}) => {
    const classes = useNavigationBarActionGroupStyles();
    return (
        <div className={classes.lineHeightFix}>
            <Inline space={24} alignItems="center">
                {children}
            </Inline>
        </div>
    );
};

type NavigationBarActionProps = TouchableProps;

const useNavigationBarActionStyles = createUseStyles((theme) => ({
    touchable: {
        lineHeight: 0,
        '& svg': {
            color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralHigh),
        },

        [theme.mq.supportsHover]: {
            '&:hover span': {
                color: ({isInverse}) =>
                    isInverse ? theme.colors.textSecondaryInverse : theme.colors.textSecondary,
            },
            '&:hover svg': {
                color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralMedium),
            },
        },
    },
}));

export const NavigationBarAction: React.FC<NavigationBarActionProps> = ({children, ...touchableProps}) => {
    const isInverse = useIsInverseVariant();
    const classes = useNavigationBarActionStyles({isInverse});
    return (
        <Touchable {...touchableProps} className={classes.touchable}>
            <Inline space={16} alignItems="center">
                {React.Children.map(children, (child) =>
                    typeof child === 'string' ? <Text2 regular>{child}</Text2> : child
                )}
            </Inline>
        </Touchable>
    );
};
