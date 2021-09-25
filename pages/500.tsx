const InternalServerError =() => {
    return <div>How the fuck did you even get here</div>;
};

export async function getStaticProps() {
    const {getAppState} = await import('../store/rehydrate');
    const baseState = await getAppState();
    return {props: {initialReduxState: baseState}}
}

export default InternalServerError
