import {GetStaticProps} from "next";
import {API} from "../../assets/api/api";
import {CharacterType} from "../../assets/api/rick-and-morty-api";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";

export const getStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map(character => (
        {params: {id: String(character.id)}})
    )

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}
    const character = await API.rickAndMorty.getCharacter(id as string)

    if (!character) {
        return{
            notFound: true
        }
    }

    return{
        props: {
            character
        }
    }

}

type PropsType = {
    character: CharacterType
}

const Character = ({character}: PropsType) => {
    return (
        <PageWrapper>
            <CharacterCard key={character.id} character={character} />
        </PageWrapper>

    )
}

Character.getLayout = getLayout
export default Character