import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styles
const Wrapper = styled.div `
    flex-direction: column;
    width: 20%;
    height: 100%;
    overflow: auto;
    margin-top: 0%;
    padding-top: 5%;
    padding-left: 2%;
`;

const ItemWrapper = styled(Link) `
    height: 40px;
    width: 100%;
    text-decoration: none;
    color: black;
    margin-bottom: 5rem;
    padding-left: 2rem;
`;

const Item = styled.div `
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    margin-bottom: 20%;
`;

const Icon = styled.div `
    height: 70%;
    padding-left: 10px;
    padding-right: 10px;
`;

const Label = styled.span `
    font-size: 16px;
    height: 100%;
    display: flex;
    align-items: center;
`;

const context = createContext({
    currentPath: '/'
});

const { Provider, Consumer } = context;

class Entry extends Component {
    render() {
        const { pathname, icon, label } = this.props;
        return (
            <Consumer>
                {({ currentPath }) => (
                <ItemWrapper
                    to={pathname}
                    selected={pathname.split('/')[1] === currentPath.split('/')[1]}
                >
                    <Item>
                    <Icon>{icon}</Icon>
                    <Label>{label}</Label>
                    </Item>
                </ItemWrapper>
                )}
            </Consumer>
        );
    }
  }

Entry.propTypes = {
    pathname: PropTypes.string,
    icon: PropTypes.object,
    label: PropTypes.string
};
  
class SideBar extends Component {
    static Entry = Entry;

    render() {
        const { location} = this.props;
        const pathname = location.pathname;
        return (
            <Provider
                value={{
                currentPath: pathname
                }}
            >
                <Wrapper>{this.props.children}</Wrapper>
            </Provider>
        );
    }

}
  
SideBar.propTypes = {
    children: PropTypes.array,
    location: PropTypes.object,
    userData: PropTypes.object
};
  
export default SideBar;

