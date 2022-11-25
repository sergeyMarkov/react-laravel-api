export default interface Address {
    line1: string;
    line2?: string;
    line3?: string;
    line4?: string;
    city: string;
    postalCode: string;
    countryCode: string;
    stateCode: string;
    stateName: string;
    user_id: string;
}