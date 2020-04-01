import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import omit from 'lodash/omit';

type DivProps<T> = HTMLElementProps<'div'> & T;

type AnchorProps<T> = HTMLElementProps<'a'> &
  T & {
    href: string;
  };

type CustomElementProps<T> = T & {
  component: React.ElementType<any>;

  [key: string]: any;
};

export type BoxProps<T> = { defaultComponent?: React.ElementType<any> } & (
  | DivProps<T>
  | AnchorProps<T>
  | CustomElementProps<T>
);

function isCustomElement<T>(
  props: BoxProps<T>,
): props is CustomElementProps<T> {
  return (props as any).component != null;
}

function isAnchorElement<T>(props: BoxProps<T>): props is AnchorProps<T> {
  return (props as any).href != null;
}

/**
 * # Box
 *
 * Box component
 *
 * ```
<Box href="https://mongodb.design">Anchors Away!</Box>
```
 * @param props.children Content to be rendered in an HTML element, or provided as a prop to the rendered component.
 * @param props.href When provided, `<Box />` will render an anchor tag with this `href` value.
 * @param props.component The component or HTML tag to be rendered by the `<Box />` component. **Note**: This will supersede the behavior of any other props.
 */

const Box = React.forwardRef(
  <T extends React.ReactNode>(props: BoxProps<T>, ref: React.Ref<any>) => {
    const rest = omit(props as any, ['component', 'defaultComponent', 'type']);
    let Box: React.ElementType<any> = props?.defaultComponent ?? 'div';

    if (isCustomElement<T>(props)) {
      Box = props.component;
    } else if (isAnchorElement<T>(props)) {
      Box = 'a';
    }

    return <Box {...rest} ref={ref} />;
  },
);

Box.displayName = 'Box';

Box.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  // @ts-ignore
  component: PropTypes.elementType,
  // @ts-ignore
  defaultComponent: PropTypes.elementType,
};

export default Box;
