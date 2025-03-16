import {API} from "@/A/api/api";
import {CharacterType, ResponseType} from "@/A/api/rick-and-morty-api";
import {PageWrapper} from "@/C/PageWrapper/PageWrapper";
import {CharacterCard} from "@/C/Card/CharacterCard/CharacterCard";
import {getLayout} from "@/C/Layout/BaseLayout/BaseLayout";

export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()
    return{
        props: {
            characters
        }
    }
}
type PropsType = {
    characters: ResponseType<CharacterType>
}

 const Characters = ({characters}: PropsType) => {
     console.log(characters);
     const charactersList = characters.results.map(character => <CharacterCard key={character.id} character={character}/>)
    return (
        <PageWrapper>
            {charactersList}
        </PageWrapper>
    )
};
Characters.getLayout = getLayout
export default Characters