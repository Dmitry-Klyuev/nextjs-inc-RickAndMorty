import React, {PropsWithChildren} from 'react';
import {NextPage} from "next";
import {Layout} from "../Layout";

export const BaseLayout: NextPage<PropsWithChildren> = ({children}) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
};

export const getLayout = (page: React.ReactElement) => {
    return (
        <BaseLayout>
            {page}
        </BaseLayout>
    )
}