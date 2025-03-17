import {CharacterStatusType} from "@/A/api/rick-and-morty-api";
import Image, {ImageProps, StaticImageData} from "next/image";

type PropsType = {
    status: CharacterStatusType
    src: StaticImageData
}
export const Status = ({status, src}: PropsType) => {

    return (
        <Image src={src} alt={'status'} width={20} height={20}/>
    )
};
