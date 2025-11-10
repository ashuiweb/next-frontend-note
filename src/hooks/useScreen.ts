import { useResponsive } from "ahooks";

export default function useScreen() {
    const responsive = useResponsive();

    return {
        ...responsive,
    };
}
