function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { ArrowRight } from 'phosphor-react';
import React from 'react';
import { useMediaQuery } from "react-responsive";
import { Dropdown } from "../button/dropdown";
import MenuImg from "../assets/list.svg";
const Divver = styled.div`
    display: flex;
    z-index: 10;
    box-sizing: border-box;
    width: 100vw;
    height: 52px;
    justify-content: space-between;
    padding: 0px 8px;
    position: fixed;
    top: 0;
    left: 0;
    transition: 200ms;
    border-bottom: solid 1px ${props => props.isTop ? "rgba(0,0,0,0)" : "var(--grey2)"} ;
    background-color: ${props => props.isTop ? "transparent" : "#ffffff"};
`;
const Items = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8px;
    @media (max-width: 600px) {
        gap: 0px;
    }
`;
const MenuBtn = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    transition: 200ms;
    color: var(--grey9);
    font-size: 14px;
    min-height: 36px;
    box-sizing: border-box;

    	
    @media (max-width: 600px) {
        display: none;
    }
    
    &:hover {
        background-color: var(--greyPlaceholder)
    }
`;
const SubComponent = styled.div`
    @media (max-width: 600px) {
        display: none;
    }
`;
const LoginBtn = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    transition: 200ms;
    color: #2D6560;
    font-weight: 800;
    gap: 8px;
    font-size: 14px;

    &:hover {
        background-color: rgba(0,0,0,0.08)
    }
`;
const LoginBtnA = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    transition: 200ms;
    color: #2D6560;
    font-weight: 800;
    gap: 8px;
    font-size: 14px;

    &:hover {
        background-color: rgba(0,0,0,0.08)
    }
`;

const Mobile = ({
  children
}) => {
  const isMobile = useMediaQuery({
    maxWidth: 767
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, isMobile && children);
};

const PC = ({
  children
}) => {
  const isPc = useMediaQuery({
    minWidth: 768
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, isPc && children);
};

const MobileDropdown = styled.div`
    &>div>div:first-child {
        padding: 8px
    }
`;
export function Header(props) {
  const {
    t
  } = useTranslation('translation');
  const [isTop, setIsTop] = useState(true);

  const onScroll = () => {
    setIsTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return /*#__PURE__*/React.createElement(Divver, {
    isTop: isTop
  }, /*#__PURE__*/React.createElement(Items, null, /*#__PURE__*/React.createElement(Dropdown, _extends({}, props.projects[props.app], {
    menus: Object.values(props.projects)
  })), props.subComponents.map((e, i) => /*#__PURE__*/React.createElement(SubComponent, {
    key: i
  }, e))), /*#__PURE__*/React.createElement(Items, null, /*#__PURE__*/React.createElement(PC, null, props.menus.map((e, i) => /*#__PURE__*/React.createElement(MenuBtn, {
    to: e.to,
    key: i
  }, e.label)), props.isLogin ? /*#__PURE__*/React.createElement(Dropdown, {
    direction: "right",
    label: props.user.name,
    img: props.user.profileImage,
    menus: props.userMenus
  }) : props.loginTo.includes('http') ? /*#__PURE__*/React.createElement(LoginBtnA, {
    href: props.loginTo
  }, t('login'), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 20,
    weight: "bold"
  })) : /*#__PURE__*/React.createElement(LoginBtn, {
    to: props.loginTo
  }, t('login'), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 20,
    weight: "bold"
  }))), /*#__PURE__*/React.createElement(Mobile, null, /*#__PURE__*/React.createElement(MobileDropdown, null, /*#__PURE__*/React.createElement(Dropdown, {
    direction: "right",
    img: MenuImg,
    menus: props.menus.map(e => ({
      to: e.to,
      label: e.label
    }))
  })), props.isLogin ? /*#__PURE__*/React.createElement(MobileDropdown, null, /*#__PURE__*/React.createElement(Dropdown, {
    direction: "right",
    img: props.user.profileImage,
    menus: props.userMenus
  })) : props.loginTo.includes('http') ? /*#__PURE__*/React.createElement(LoginBtnA, {
    href: props.loginTo
  }, t('login'), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 20,
    weight: "bold"
  })) : /*#__PURE__*/React.createElement(LoginBtn, {
    to: props.loginTo
  }, t('login'), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 20,
    weight: "bold"
  })))));
}
Header.defaultProps = {
  isLogin: false,
  loginTo: '/login',
  projects: {
    example: {
      to: '/',
      img: 'https://static.opize.me/opize.png',
      label: 'example Project'
    }
  },
  subComponents: [],
  menus: [],
  userMenus: [],
  app: 'example',
  user: {
    name: 'example user',
    profileImage: 'https://static.opize.me/opize/1645012676462/opize-circle.png'
  }
};