import {API} from "@/A/api/api";
import { EpisodeType, ResponseType} from "@/A/api/rick-and-morty-api";
import {PageWrapper} from "@/C/PageWrapper/PageWrapper";
import {Card} from "@/C/Card/Card";
import {getLayout} from "@/C/Layout/BaseLayout/BaseLayout";

export const getServerSideProps = async () => {
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