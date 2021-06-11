import React, { useRef, useEffect } from 'react';

// Style
import HeaderStyled from './Header.styled';

// Utils
import FocusLock from 'react-focus-lock';
import Wrapper from '../wrapper/Wrapper';
import { addOverlayCSS, removeOverlayCSS } from '../../utils/addOverlayCSS';

// Components
import IconButton from '../iconButton/IconButton';
import VisuallyHidden from '../visuallyHidden/VisuallyHidden';
import HeaderSearch from '../headerSearch/HeaderSearch.container';
import Navigation from '../navigation/Navigation.container';

// Hooks
import { _useOnClickOutside } from '../../utils/hooks/useOnClickOutside';
import { _useLockBodyScroll } from '../../utils/hooks/useLockBodyScroll';
export interface Props {
  className?: string;
  _setIsSearchOpen: (val: boolean) => void;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  isBasketOpen: boolean;
  isLight: boolean;
}

interface SearchOpenHeaderProps {
  _setIsSearchOpen: (val: boolean) => void;
}

const SearchOpenHeader = ({ _setIsSearchOpen }: SearchOpenHeaderProps) => {
  _useLockBodyScroll();
  const ref = useRef();
  _useOnClickOutside(ref, () => _setIsSearchOpen(false));
  return (
    <div ref={ref} className="header__search--wrapper">
      <HeaderSearch className="header__search" />
      <Navigation />
    </div>
  );
};

const Header = ({
  className,
  _setIsSearchOpen,
  isSearchOpen,
  isLight,
}: Props) => {
  useEffect(() => {
    if (isSearchOpen) addOverlayCSS();
    else removeOverlayCSS();
  }, [isSearchOpen]);
  return (
    <HeaderStyled
      className={className}
      isSearchOpen={isSearchOpen}
      isLight={isLight}
    >
      <Wrapper
        condition={isSearchOpen}
        wrapper={(children: any) => (
          <>
            {children}
            <FocusLock>
              <SearchOpenHeader _setIsSearchOpen={_setIsSearchOpen} />
            </FocusLock>
          </>
        )}
      >
        <a href="/" className="header__logo-link">
          <img
            className="header__logo"
            src={
              isLight
                ? '/static/img/logos/logo-light.svg'
                : '/static/img/logos/logo-dark.svg'
            }
            alt="Leif"
          />
          <VisuallyHidden text="Home" />
        </a>
        <div className="header__actions">
          <IconButton
            className="header__search-icon"
            icon="search"
            text="Search site"
            isToggled={isSearchOpen}
            _func={() => _setIsSearchOpen(!isSearchOpen)}
          />
          <Navigation />
        </div>
      </Wrapper>
    </HeaderStyled>
  );
};

export default Header;
