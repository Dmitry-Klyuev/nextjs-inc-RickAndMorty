import {GetStaticProps} from "next";
import {API} from "../../assets/api/api";
import {CharacterType} from "../../assets/api/rick-and-morty-api";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {useRouter} from "next/router";
import styled from "styled-components";

export const getStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map(character => (
        {params: {id: String(character.id)}})
    )

    return {
        paths,
        // fallback: false //если страница не сгенерирована при сборке, то выдай ошибку 404
        fallback: 'blocking' // Если страница не сгенерирована, то запрашиваем данные с сервера
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}
    const character = await API.rickAndMorty.getCharacter(id as string)

    if (!character) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            character
        }
    }

}

type PropsType = {
    character: CharacterType
}

const Character = ({character}: PropsType) => {

    //Достать id из url
    const route = useRouter()
    const {id} = route.query


    //Редирект в next.js или Link, или useRouter
    const goToCharacters = () => route.push('/characters')

    return (
        <PageWrapper>
            <Wrapper>
                <h2>id: {id}</h2>
                <CharacterCard key={character.id} character={character}/>
                <Btn onClick={goToCharacters}>Navigate to characters</Btn>
            </Wrapper>
        </PageWrapper>

    )
}

Character.getLayout = getLayout
export default Character


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`
const Btn = styled.button`
    padding: 15px 20px;
    background: #7cfa52;
    border-radius: 12px;
    border: 1px solid rgba(131, 134, 135, 0);
    cursor: pointer;
    transition: all ease-in-out 0.2s;
    &:hover {
        transform: translateY(-5px);
        transition: all ease-in-out 0.2s ;
    }
`