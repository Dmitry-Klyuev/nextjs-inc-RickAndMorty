import {API} from "@/A/api/api";
import { EpisodeType, ResponseType} from "@/A/api/rick-and-morty-api";
import {PageWrapper} from "@/C/PageWrapper/PageWrapper";
import {Card} from "@/C/Card/Card";
import {getLayout} from "@/C/Layout/BaseLayout/BaseLayout";
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {res} = ctx
    //ревалидация кэша
    res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=100')

    const episodes = await API.rickAndMorty.getEpisodes()
    //если нет эпизодов, то 404
    if(!episodes){
        return{
            notFound: true
        }
    }

    return{
        props: {
            episodes
        }
    }
}
type PropsType = {
    episodes: ResponseType<EpisodeType>
}

 const Episodes = ({episodes}: PropsType) => {
     console.log()
     const episodesList = episodes.results.map(episode => <Card key={episode.id} name={episode.name} />)
    return (
        <PageWrapper>
            {episodesList}
        </PageWrapper>
    )
};

Episodes.getLayout = getLayout
export default Episodes