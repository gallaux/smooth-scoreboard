import axios from "axios";

const countryFlagsApiUrl: string = "https://countryflagsapi.com";
const getCountryFlagApi = (countryCode: string): string => countryFlagsApiUrl + "/svg/" + countryCode;

export const getCountryFlagSvg = async (countryCode: string) => {
    let svg: string = "";
    if (countryCode) {
        await axios.get<string>(getCountryFlagApi(countryCode))
            .then(response => {
                if (response.status === 200 && response.data) {
                    svg = response.data;
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    return svg;
};