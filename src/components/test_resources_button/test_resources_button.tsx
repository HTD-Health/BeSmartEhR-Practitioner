import { Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import FHIR from 'fhirclient';
import Client from 'fhirclient/lib/Client';

import addTestResource from './test_resource_request';

import CustomSnackbar from 'components/custom_snackbar/custom_snackbar';

const TestResourcesButton = (): JSX.Element => {
    const [client, setClient] = useState<Client | undefined>(undefined);
    const [statusSnackbar, setStatusSnackbar] = useState<number>(0);

    useEffect(() => {
        const fetchClient = async (): Promise<void> => {
            const clientTemp = await FHIR.oauth2.ready();
            setClient(clientTemp);
        };
        fetchClient();
    }, [client]);

    if (!client) {
        return <CircularProgress />;
    }

    const addResource = async (): Promise<void> => {
        const success = await addTestResource(client);
        if (success) {
            setStatusSnackbar(2);
        } else {
            setStatusSnackbar(1);
        }
    };

    return (
        <>
            <CustomSnackbar
                open={statusSnackbar > 0}
                onClose={() => setStatusSnackbar(0)}
                message="Failed to get current user data"
                severity={statusSnackbar === 1 ? 'error' : 'success'}
            />
            <Button variant="contained" sx={{ my: '0.5rem' }} onClick={addResource}>
                Add test Questionnaire
            </Button>
        </>
    );
};

export default TestResourcesButton;
