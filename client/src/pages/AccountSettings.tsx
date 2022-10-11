import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyIcon from '@mui/icons-material/Key';
import UserForm, { IUserForm } from './../components/UserForm/UserForm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddCardIcon from '@mui/icons-material/AddCard';

const Wrapper = styled(Box)`
    margin-top: 75px;
    background-color: #1c1d1f;
    height: 220px;
    width: 100vw;
`;

interface ISetting {
    name: IUserForm['type'];
    icon: React.ReactNode;
}

const settingsList: ISetting[] = [
    {
        name: 'add funds',
        icon: <AddCardIcon sx={{ fontSize: 160 }} />,
    },
    {
        name: 'change of profile picture',
        icon: <AddAPhotoIcon sx={{ fontSize: 160 }} />,
    },
    {
        name: 'change username',
        icon: <DriveFileRenameOutlineIcon sx={{ fontSize: 160 }} />,
    },
    {
        name: 'change password',
        icon: <KeyIcon sx={{ fontSize: 160 }} />,
    },
];

const AccountSettings = () => {
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [userFormType, setUserFormType] = React.useState<IUserForm['type']>(null);

    const handleOpenModal = (type: typeof userFormType) => {
        setOpenModal(true);
        setUserFormType(type);
    };

    const handleFormType = (type: typeof userFormType) => {};

    return (
        <>
            <Wrapper>
                <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <Typography variant="h3" component="h1" sx={{ color: 'white', mb: 6 }}>
                        Account settings
                    </Typography>
                </Container>
            </Wrapper>
            <section>
                <Container maxWidth="lg" sx={{ paddingY: 6 }}>
                    <Grid container spacing={2}>
                        {settingsList?.map((item) => (
                            <Grid item key={item.name} xs={12} sm={6} md={3}>
                                <Card
                                    sx={{ height: 280, textAlign: 'center', cursor: 'pointer' }}
                                    onClick={() => handleOpenModal(item.name)}
                                >
                                    <CardContent>
                                        {item.icon}
                                        <Typography variant="h5">
                                            {item.name && item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>
            <UserForm open={openModal} handleClose={() => setOpenModal(false)} type={userFormType} handleFormType={handleFormType} />
        </>
    );
};

export default AccountSettings;
