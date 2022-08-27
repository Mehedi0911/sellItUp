export const ValidateAdScreenOne = (data: any) => {
    if (!data?.title) {
        return { name: 'title', error: 'Title Is Required' }
    }
    if (!data?.category) {
        return { name: 'category', error: 'Category Is Required' }
    }
    if (!data?.subCategory) {
        return { name: 'subCategory', error: 'Sub Category Is Required' }
    }
    if (!data?.brand) {
        return { name: 'brand', error: 'Brand Is Required' }
    }
    if (!data?.model) {
        return { name: 'model', error: 'Model Is Required' }
    }
    if (!data?.condition) {
        return { name: 'condition', error: 'Condition Is Required' }
    }
    if (!data?.authenticity) {
        return { name: 'authenticity', error: 'Authenticity Is Required' }
    }
    if (!data?.price) {
        return { name: 'price', error: 'Price Is Required' }
    }
    if (!data?.price) {
        return { name: 'negotiable', error: 'Price Type Is Required' }
    }

    return null
}
export const ValidateAdScreenTwo = (data: any, images: any) => {
    if (!data?.description) {
        return { name: 'description', error: 'Description Is Required' }
    }
    if (images?.length === 0) {
        return { name: 'images', error: 'Must select at least one image' }
    }

    return null
}
export const ValidateAdScreenThree = (data: any) => {
    if (!data?.phone) {
        return { name: 'Phone', error: 'Phone Number is Required' }
    }
    if (!data?.country) {
        return { name: 'country', error: 'Country is Required' }
    }
    if (!data?.city) {
        return { name: 'city', error: 'City is Required' }
    }
    if (!data?.state) {
        return { name: 'state', error: 'State is Required' }
    }
    if (!data?.address) {
        return { name: 'address', error: 'Address is Required' }
    }
    return null
}