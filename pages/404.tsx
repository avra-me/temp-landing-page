const NotFound =() => {
    return null;
};

export async function getStaticProps() {
    const {getAppState} = await import('../store/rehydrate');
    const baseState = await getAppState();
    return {props: {initialReduxState: baseState}}
}

export default NotFound
