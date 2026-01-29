import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // delete existing data
    await prisma.actionLog.deleteMany();
    await prisma.component.deleteMany();
    await prisma.page.deleteMany();

    // Reset IDs in SQLite
    try {
        await prisma.$executeRawUnsafe("DELETE FROM sqlite_sequence WHERE name IN ('Page', 'Component', 'ActionLog')");
    } catch (e) {
        // sqlite_sequence might not exist if no rows were ever inserted
        console.log('Note: Could not reset sqlite_sequence');
    }

    // Create a Dashboard Page
    const dashboard = await prisma.page.create({
        data: {
            name: 'Dashboard',
            route: '/dashboard',
            title: 'Main Dashboard',
            components: {
                create: [
                    {
                        componentType: 'DynButton',
                        name: 'Main Action Button',
                        order: 1,
                        configuration: JSON.stringify({
                            kind: 'primary',
                            size: 'lg',
                            children: 'Create New Item'
                        })
                    },
                    {
                        componentType: 'DynTable',
                        name: 'Users Table',
                        order: 2,
                        configuration: JSON.stringify({
                            columns: [
                                { key: 'id', title: 'ID' },
                                { key: 'name', title: 'Name' },
                                { key: 'status', title: 'Status' }
                            ],
                            pagination: {
                                current: 1,
                                pageSize: 10,
                                total: 100
                            }
                        })
                    }
                ]
            }
        },
    });

    // Create settings page
    const settings = await prisma.page.create({
        data: {
            name: 'Settings',
            route: '/settings',
            title: 'User Settings',
            components: {
                create: [
                    {
                        componentType: 'DynSwitch',
                        name: 'Notifications Toggle',
                        order: 1,
                        configuration: JSON.stringify({
                            label: 'Enable Email Notifications',
                            defaultChecked: true,
                            size: 'lg',
                            color: 'success'
                        })
                    },
                    {
                        componentType: 'DynAvatar',
                        name: 'User Profile',
                        order: 2,
                        configuration: JSON.stringify({
                            alt: 'John Doe',
                            size: 'xl',
                            status: 'success',
                            shape: 'square'
                        })
                    },
                    {
                        componentType: 'DynBadge',
                        name: 'Status Badge',
                        order: 3,
                        configuration: JSON.stringify({
                            content: 'Administrator',
                            color: 'danger',
                            variant: 'solid'
                        })
                    },
                    {
                        componentType: 'DynProgress',
                        name: 'Storage Usage',
                        order: 4,
                        configuration: JSON.stringify({
                            value: 75,
                            max: 100,
                            showPercentage: true,
                            status: 'warning',
                            label: 'Storage Space'
                        })
                    }
                ]
            }
        }
    });

    // Create User Registration Page
    const registration = await prisma.page.create({
        data: {
            name: 'User Registration',
            route: '/registration',
            title: 'New User Registration',
            components: {
                create: [
                    {
                        componentType: 'DynProgress',
                        name: 'Registration Progress',
                        order: 1,
                        configuration: JSON.stringify({
                            value: 0,
                            max: 100,
                            showPercentage: true,
                            label: 'Form Completion',
                            size: 'lg',
                            status: 'primary'
                        })
                    },
                    {
                        componentType: 'DynInput',
                        name: 'First Name',
                        order: 2,
                        configuration: JSON.stringify({
                            label: 'First Name',
                            placeholder: 'Enter your first name',
                            required: true,
                            maxLength: 20,
                            helperText: 'First name must be between 2 and 20 characters'
                        })
                    },
                    {
                        componentType: 'DynInput',
                        name: 'Last Name',
                        order: 3,
                        configuration: JSON.stringify({
                            label: 'Last Name',
                            placeholder: 'Enter your last name',
                            required: true,
                            maxLength: 20,
                            helperText: 'Last name must be between 2 and 20 characters'
                        })
                    },
                    {
                        componentType: 'DynInput',
                        name: 'Age',
                        order: 4,
                        configuration: JSON.stringify({
                            label: 'Age',
                            placeholder: 'Enter your age',
                            type: 'number',
                            required: true,
                            helperText: 'Age must be between 18 and 100',
                            validationRules: [
                                { type: 'min', value: 18, message: 'Must be at least 18 years old' },
                                { type: 'max', value: 100, message: 'Age cannot exceed 100' }
                            ]
                        })
                    },
                    {
                        componentType: 'DynSwitch',
                        name: 'Terms Consent',
                        order: 5,
                        configuration: JSON.stringify({
                            label: 'I confirm that I have read and agree to the terms and conditions',
                            required: true
                        })
                    },
                    {
                        componentType: 'DynButton',
                        name: 'Submit Registration',
                        order: 6,
                        configuration: JSON.stringify({
                            children: 'Submit Registration',
                            kind: 'primary',
                            size: 'lg',
                            width: 'full'
                        })
                    },
                    {
                        componentType: 'DynTable',
                        name: 'Registered Users',
                        order: 7,
                        configuration: JSON.stringify({
                            columns: [
                                { key: 'firstName', title: 'First Name' },
                                { key: 'lastName', title: 'Last Name' },
                                { key: 'age', title: 'Age' },
                                { key: 'consent', title: 'Consented', type: 'boolean' }
                            ],
                            emptyText: 'No users registered yet',
                            bordered: true,
                            striped: true
                        })
                    }
                ]
            }
        }
    });

    console.log('✅ Seed completed.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
