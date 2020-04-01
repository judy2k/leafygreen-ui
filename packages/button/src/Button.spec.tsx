import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Button from './Button';

afterAll(cleanup);

describe('packages/Button', () => {
  const onClick = jest.fn();
  const className = 'test-button-class';
  const title = 'Test button title';
  const child = 'Button child';

  describe('by default', () => {
    const { getByTestId } = render(
      <Button
        className={className}
        title={title}
        onClick={onClick}
        data-testid="default-button"
      >
        {child}
      </Button>,
    );

    const defaultButton = getByTestId('default-button');

    test(`renders "${className}" in the button's classList`, () => {
      expect(defaultButton.classList.contains(className)).toBe(true);
    });

    test(`renders "${child}" as the button's textContent`, () => {
      expect(defaultButton.textContent).toBe(child);
    });

    test(`renders "${title}" as the button title`, () => {
      expect(defaultButton.title).toBe(title);
    });

    test(`renders inside of a button tag by default`, () => {
      expect(defaultButton.tagName.toLowerCase()).toBe('button');
    });

    test('fires the onClick handler once when clicked', () => {
      fireEvent.click(defaultButton);
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('when the button "disabled" prop is set', () => {
    const { getByTestId } = render(
      <Button disabled data-testid="disabled-button">
        Text
      </Button>,
    );

    const disabledButton = getByTestId('disabled-button');

    test('renders as disabled when the prop is set', () => {
      expect((disabledButton as HTMLButtonElement).disabled).toBe(true);
      expect(
        (disabledButton as HTMLButtonElement).getAttribute('aria-disabled'),
      ).toBe('true');
    });

    test(`does not renders the disabled attributes when disabled is set and it's an anchor`, () => {
      const { getByTestId } = render(
        <Button
          href="http://mongodb.design"
          disabled
          data-testid="anchor-disabled"
        >
          Click me!
        </Button>,
      );

      const disabledAnchorButton = getByTestId('anchor-disabled');

      expect(disabledAnchorButton.getAttribute('disabled')).toBeNull();
      expect(disabledAnchorButton.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('when the "type" prop is set', () => {
    const { getByTestId } = render(
      <Button type="submit" data-testid="submit-button">
        Submit Button!
      </Button>,
    );

    const submitButton = getByTestId('submit-button');

    test('it renders as a submit button when the "type" prop is set to submit', () => {
      expect((submitButton as HTMLButtonElement).type).toBe('submit');
    });
  });

  describe('when the "href" prop is set', () => {
    const { getByTestId } = render(
      <Button href="http://mongodb.design" data-testid="anchor-button">
        Click me!
      </Button>,
    );

    const anchorButton = getByTestId('anchor-button');

    test(`renders component inside of a tag when "href" prop is set`, () => {
      expect((anchorButton as HTMLAnchorElement).tagName.toLowerCase()).toBe(
        'a',
      );
      expect((anchorButton as HTMLAnchorElement).href).toBe(
        'http://mongodb.design/',
      );
    });
  });

  describe('when the "component" prop is set', () => {
    const { getByTestId } = render(
      <Button component="div" data-testid="div-button">
        Click me!
      </Button>,
    );
    const divButton = getByTestId('div-button');

    test('renders inside of a div when the "component" prop is set to "div"', () => {
      expect(divButton.tagName.toLowerCase()).toBe('div');
    });

    test('renders inside of "div" tags when "component" prop is set and the "href" prop is set', () => {
      const { getByTestId } = render(
        <Button
          component="div"
          data-testid="div-button-with-anchor"
          href="http://mongodb.design"
        >
          Click me!
        </Button>,
      );

      const divButtonWithAnchor = getByTestId('div-button-with-anchor');

      expect(divButtonWithAnchor.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('when the "glyph" prop is set', () => {
    const { getByTestId } = render(
      <Button glyph={<svg />} data-testid="trash-button">
        My Trash Button
      </Button>,
    );

    const trashButton = getByTestId('trash-button');

    test(`renders a button with an arbitrary element passed in glyph prop`, () => {
      expect(trashButton.innerHTML).toContain('svg');
    });
  });
});
