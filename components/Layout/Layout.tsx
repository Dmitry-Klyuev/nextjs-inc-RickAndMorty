import React, {PropsWithChildren} from 'react';
import styled from "styled-components";
import {NextPage} from "next";
import {Header} from "../Header/Header";

export const Layout: NextPage<PropsWithChildren> = ({children}) => {
    return (
        <Container>
            <Header/>
            <Main>
                {children}
            </Main>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`

const Main = styled.div`
    width: 100%;
    padding-bottom: 10px;
    overflow: hidden;
`
