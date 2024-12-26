import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Styles from './noBookFound.module.css';
import StyledButton from "../../components/StyleComponentsFolder/styledButton";

export default function NoBookFound() {
    const router = useRouter();

    return (
        <div className={Styles.invalidcontainer}>
            <div className={Styles.animateCon}>
                <DotLottieReact
                    src="https://lottie.host/f95cfacb-6440-40e9-a37f-15d6ded82ce0/W0zginnfWq.lottie"
                    autoplay 
                    loop 
                />
            </div>
            <p>הספר שבחרת לא קיים ברשימת הספרים שלך.</p>
            <StyledButton onClick={() => router.push('/bookCatalog')}>
                חזור לקטלוג הספרים
            </StyledButton>
        </div>
    );
}