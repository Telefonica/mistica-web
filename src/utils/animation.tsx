import * as React from 'react';
import {isRunningAcceptanceTest} from './platform';

import type {Theme} from '../theme';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isRunningAcceptanceTest(platformOverrides);

type AnimationProps = {
    children?: React.ReactNode;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    opacity?: number;
};

export const getAnimateCircleScaleInProps = (
    to: string | number,
    platformOverrides: Theme['platformOverrides']
): null | AnimationProps =>
    areAnimationsSupported(platformOverrides)
        ? {
              children: (
                  <animate
                      attributeName="r"
                      begin="0s"
                      dur="0.9s"
                      from="0"
                      to={to}
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.65 0 0.25 1"
                  />
              ),
          }
        : null;

export const getAnimateDrawLineProps = (
    from: string,
    begin: string,
    platformOverrides: Theme['platformOverrides'],
    keySplines?: string
): null | AnimationProps =>
    areAnimationsSupported(platformOverrides)
        ? {
              strokeDasharray: from.replace('-', ''),
              strokeDashoffset: from,
              children: (
                  <animate
                      attributeName="stroke-dashoffset"
                      from={from}
                      to="0"
                      dur="0.7"
                      repeatCount="1"
                      begin={begin}
                      fill="freeze"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines={keySplines ?? '0.65 0 0.25 1'}
                  />
              ),
          }
        : null;

export const getAnimateFadeInProps = (
    begin: string,
    platformOverrides: Theme['platformOverrides']
): null | AnimationProps =>
    areAnimationsSupported(platformOverrides)
        ? {
              opacity: 0,
              children: (
                  <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      dur="0.4"
                      repeatCount="1"
                      begin={begin}
                      fill="freeze"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.65 0 0.25 1"
                  />
              ),
          }
        : null;

export const getAnimateHopInProps = (
    begin: string,
    platformOverrides: Theme['platformOverrides']
): null | AnimationProps =>
    areAnimationsSupported(platformOverrides)
        ? {
              children: (
                  <>
                      <animate
                          from="2.5"
                          to="2"
                          dur="0.7s"
                          begin={begin}
                          keyTimes="0;1"
                          calcMode="spline"
                          fill="freeze"
                          keySplines="0.65 0 0.25 1"
                      />
                      <animateTransform
                          attributeName="transform"
                          type="translate"
                          from="-0.5 1"
                          to="0 0"
                          dur="0.7s"
                          begin={begin}
                          keyTimes="0;1"
                          calcMode="spline"
                          fill="freeze"
                          keySplines="0.65 0 0.25 1"
                      />
                  </>
              ),
          }
        : null;

export const getAnimateSweepInProps = (
    begin: string,
    platformOverrides: Theme['platformOverrides']
): null | AnimationProps =>
    areAnimationsSupported(platformOverrides)
        ? {
              opacity: 0,
              children: (
                  <>
                      <animate
                          attributeName="opacity"
                          from="0"
                          to="1"
                          dur="0.1"
                          begin={begin}
                          fill="freeze"
                          keyTimes="0;1"
                          calcMode="spline"
                          keySplines="0.65 0 0.25 1"
                      />
                      <animateTransform
                          attributeName="transform"
                          type="scale"
                          from="0 0"
                          to="1.15 1.15"
                          dur="0.8s"
                          begin={begin}
                          keyTimes="0;1"
                          additive="sum"
                          calcMode="spline"
                          fill="freeze"
                          keySplines="0.8 0 0 1"
                      />
                      <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="50 21 10"
                          to="0 21 10"
                          dur="0.8s"
                          begin={begin}
                          keyTimes="0;1"
                          additive="sum"
                          calcMode="spline"
                          fill="freeze"
                          keySplines="0.8 0 0 1"
                      />
                      <animateTransform
                          attributeName="transform"
                          type="scale"
                          from="1.1 1.1"
                          to="1 1"
                          dur="0.2s"
                          begin={`${parseFloat(begin) + 0.8}s`}
                          keyTimes="0;1"
                          calcMode="spline"
                          fill="freeze"
                          keySplines="0.65 0 0.25 1"
                      />
                  </>
              ),
          }
        : null;

const mergeChildren = ({children}: AnimationProps, nextChild?: React.ReactNode) => (
    <>
        {children}
        {nextChild}
    </>
);

export const mergeProperties = (...props: Array<AnimationProps | null>): AnimationProps =>
    props.reduce(
        (allProps, nextProps) => ({
            ...allProps,
            ...(nextProps || {}),
            children: mergeChildren(allProps, nextProps ? nextProps.children : null),
        }),
        {children: null} as any
    );
