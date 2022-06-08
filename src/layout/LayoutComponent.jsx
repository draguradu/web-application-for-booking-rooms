import React from 'react';
import HeaderContainer from './header/HeaderContainer';
import ContentContainer from './content/ContentContainer';

function LayoutComponent() {
    return (
        <React.Fragment>
            <HeaderContainer />
            <ContentContainer />
        </React.Fragment>
    )
}

export default LayoutComponent;
