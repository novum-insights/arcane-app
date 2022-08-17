const url = import.meta.env.PROD ? 'https://arcane.novuminsights.com/' : `http://${new URL(import.meta.url).host}`;

export const onPersistState = async (dehydratedState: string) => {
    // const formData = new FormData();
    // formData.set('dehydratedState', dehydratedState);

    await fetch(url + '/api/save', {
        method: 'POST',
        body: JSON.stringify({ dehydratedState }),
    });
};

export const onSignOut = async () => {
    await fetch(url + '/api/destroy', {
        method: 'POST',
        body: null,
    });
};
