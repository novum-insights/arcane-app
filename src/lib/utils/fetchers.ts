const url = import.meta.env.PROD ? 'https://arcane.novuminsights.com/' : `http://${new URL(import.meta.url).host}`;

export const onPersistState = async (dehydratedState: string) => {
    const formData = new FormData();

    formData.set('dehydratedState', dehydratedState);

    await fetch(url + '/api/session/save', {
        method: 'POST',
        body: formData,
    });
};

export const onSignOut = async () => {
    await fetch(url + '/api/session/destroy', {
        method: 'POST',
        body: null,
    });
};
