/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import styledJsx from '../index';

function displayPrimary({ $primary }) {
  return $primary ? `
  color: white;
  background-color: #1ea7fd;
  ` : `
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
`;
}
function displaySize({ $size }) {
  switch ($size) {
    case 'small':
      return `
      font-size: 12px;
      padding: 10px 16px;
    `;
    case 'medium':
      return `
      font-size: 14px;
      padding: 11px 20px;
      `;
    case 'large':
      return `
        font-size: 16px;
        padding: 12px 24px;
        `;
    default:
      return '';
  }
}
const StyledButton = styledJsx.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  ${displayPrimary}
  ${displaySize}

  background-color: ${({ $backgroundColor }) => $backgroundColor as unknown ?? ''};
`;
/**
 * Primary UI component for user interaction
 */
const Button = function Button({
  primary, backgroundColor, size, label, ...props
}: { primary?: boolean, backgroundColor?: string, size?: string, label: string }) {
  return (
    <StyledButton
      $primary={primary}
      $size={size}
      $backgroundColor={backgroundColor}
      type="button"
      {...props}
    >
      {label}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

export default Button;
