import React from 'react';
import {PageWrapper} from "@/C/PageWrapper/PageWrapper";
import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import {LocationType, ResponseType} from "@/A/api/rick-and-morty-api";
import {Card} from "@/C/Card/Card";
import {getLayout} from "@/C/Layout/BaseLayout/BaseLayout";

const getLocations = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/location')
    return res.json()
}
export const getStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery(['locations'], getLocations)
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const Locations = () => {
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationsList = locations.results.map(location => (
        <Card key={location.id} name={location.name}/>
    ))

    return (
        <PageWrapper>
            {locationsList}
        </PageWrapper>
    )
};

Locations.getLayout = getLayout
export default Locations
