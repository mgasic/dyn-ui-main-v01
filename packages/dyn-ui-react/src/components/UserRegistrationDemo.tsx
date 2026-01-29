/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { DynButton } from './DynButton';
import { DynInput } from './DynInput';
import { DynSwitch } from './DynSwitch';
import { DynProgress } from './DynProgress';
import { DynTable } from './DynTable';
import { DynLoading } from './DynLoading';
import { DynBadge } from './DynBadge';

interface UserRegistrationDemoProps {
    pageId: number;
}

/**
 * Smart Container for User Registration Flow
 * 
 * Responsibilities:
 * 1. Fetch UI definition from Backend (Server-Driven UI)
 * 2. Manage Form State & Validation (Client-Side Logic)
 * 3. Calculate Progress dynamically
 * 4. Handle Submissions and Update Table
 */
export const UserRegistrationDemo: React.FC<UserRegistrationDemoProps> = ({ pageId }) => {
    // 1. Fetch Page Components
    // Note: In a real app we'd have a specific hook for "getPageComponents"
    // For this demo, we'll fetch them individually or assume we have a list hook.
    // Since our hook is single-component based, we'll fetch the whole list via a direct fetch for this demo
    // or use a hypothetical 'usePageConfig' if we had one.
    // To keep it simple without new hooks, we'll use a direct fetch in useEffect.

    const [components, setComponents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Record<string, any>>({
        firstName: '',
        lastName: '',
        age: '',
        consent: false
    });

    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        const fetchPageComponents = async () => {
            try {
                // Fetch all components for this page
                const response = await fetch(`http://localhost:3001/api/components?pageId=${pageId}`);
                if (!response.ok) throw new Error('Failed to load page configuration');
                const data = await response.json();
                setComponents(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchPageComponents();
    }, [pageId]);

    // Track validity of complex fields (Client-side mirror of component internal state)
    const [fieldValidity, setFieldValidity] = useState({
        age: false, // Starts as invalid/incomplete
    });

    const handleValidation = (field: string, isValid: boolean) => {
        setFieldValidity(prev => {
            if (prev[field as keyof typeof prev] === isValid) return prev;
            return { ...prev, [field]: isValid };
        });
    };

    // 2. Progress Calculation
    const progress = useMemo(() => {
        let completed = 0;
        let total = 0;

        // Count required fields
        // Check firstName (Legacy/Simple check)
        if (formData.firstName && formData.firstName.trim().length > 0) completed++;
        total++;

        // Check lastName (Legacy/Simple check)
        if (formData.lastName && formData.lastName.trim().length > 0) completed++;
        total++;

        // Check age (Smart check via Validation Rules)
        // Must be filled AND reported valid by the component
        const ageFilled = formData.age && String(formData.age).trim().length > 0;
        if (ageFilled && fieldValidity.age) completed++;
        total++;

        // Check consent
        if (formData.consent === true) completed++;
        total++;

        // Avoid division by zero
        if (total === 0) return 0;

        return Math.round((completed / total) * 100);
    }, [formData, fieldValidity]); // Recalculate whenever formData or validity changes

    // 3. Handlers
    const handleInputChange = (field: string, value: any) => {
        // console.log(`Updating ${field} to:`, value); // Debug log
        setFormData(prev => {
            const newState = { ...prev, [field]: value };
            return newState;
        });
        if (submissionStatus === 'success') setSubmissionStatus('idle');
    };

    const handleSubmit = () => {
        // Basic validation check
        if (progress < 100) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Simulate API submission
        const newUser = {
            id: Date.now(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: formData.age,
            consent: formData.consent
        };

        setRegisteredUsers(prev => [...prev, newUser]);
        setSubmissionStatus('success');

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            consent: false
        });
        // Reset validity
        setFieldValidity({ age: false });
        // Reset form key to force a clean remount of inputs (resets internal 'touched' states)
        setFormKey(prev => prev + 1);
    };

    if (loading) return <DynLoading variant="dots" label="Loading Registration Form..." />;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    // Helper to find component config by name/type
    const getComponent = (name: string) => components.find(c => c.name === name);

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            background: 'var(--dyn-bg-surface)',
            borderRadius: '16px',
            boxShadow: 'var(--dyn-shadow-lg)'
        }}>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--dyn-neutral-mid-200)', paddingBottom: '0.5rem' }}>
                Server-Driven Registration
            </h2>

            <div key={formKey} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* 1. Dynamic Progress Bar */}
                {(() => {
                    const comp = getComponent('Registration Progress');
                    if (comp) {
                        return (
                            <DynProgress
                                {...comp.configuration}
                                value={progress}
                                status={progress === 100 ? 'success' : 'primary'}
                            />
                        );
                    }
                    return null;
                })()}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {/* 2. First Name */}
                    {(() => {
                        const comp = getComponent('First Name');
                        if (comp) {
                            return (
                                <DynInput
                                    {...comp.configuration}
                                    value={formData.firstName}
                                    // FIX: DynInput onChange returns the value directly, not an event
                                    onChange={(value) => handleInputChange('firstName', value)}
                                    // Show error if empty and touched, or if maxLength reached
                                    // status={formData.firstName.length >= 20 ? 'warning' : 'default'} // Not supported
                                    // message={formData.firstName.length >= 20 ? 'Max length reached' : undefined} // Not supported, use errorMessage
                                    errorMessage={formData.firstName.length >= 20 ? 'Max length reached' : undefined}
                                />
                            );
                        }
                    })()}

                    {/* 3. Last Name */}
                    {(() => {
                        const comp = getComponent('Last Name');
                        if (comp) {
                            return (
                                <DynInput
                                    {...comp.configuration}
                                    value={formData.lastName}
                                    // FIX: DynInput onChange returns the value directly
                                    onChange={(value) => handleInputChange('lastName', value)}
                                // Example of using backend config for basic props, but overriding interactive ones
                                />
                            );
                        }
                    })()}
                </div>

                {/* 4. Age */}
                {(() => {
                    const comp = getComponent('Age');
                    if (comp) {
                        // Smart Component Logic:
                        // We no longer calculate 'isInvalid' here.
                        // We rely on 'comp.configuration.validationRules' from backend.
                        // We just listen to 'onValidate' to update our progress tracker.

                        return (
                            <DynInput
                                {...comp.configuration}
                                value={formData.age}
                                onChange={(value) => handleInputChange('age', value)}
                                onValidate={(isValid) => handleValidation('age', isValid)}
                            // No 'errorMessage' or 'status' passed here - component handles it!
                            />
                        );
                    }
                })()}

                {/* 5. Consent Switch */}
                {(() => {
                    const comp = getComponent('Terms Consent');
                    if (comp) {
                        return (
                            <DynSwitch
                                {...comp.configuration}
                                // Manually append asterisk for required field visually
                                label={comp.configuration.label + (comp.configuration.required ? ' *' : '')}
                                checked={formData.consent}
                                onChange={(checked) => handleInputChange('consent', checked)}
                            />
                        );
                    }
                })()}

                {/* 6. Submit Button */}
                {(() => {
                    const comp = getComponent('Submit Registration');
                    if (comp) {
                        return (
                            <div style={{ marginTop: '1rem' }}>
                                <DynButton
                                    {...comp.configuration}
                                    onClick={handleSubmit}
                                    disabled={progress < 100}
                                />
                                {submissionStatus === 'success' && (
                                    <span style={{ marginLeft: '1rem' }}>
                                        <DynBadge color="success">Registration Successful!</DynBadge>
                                    </span>
                                )}
                            </div>
                        );
                    }
                })()}

                {/* 7. Data Table */}
                {(() => {
                    const comp = getComponent('Registered Users');
                    if (comp) {
                        return (
                            <div style={{ marginTop: '2rem' }}>
                                <DynTable
                                    {...comp.configuration}
                                    data={registeredUsers}
                                />
                            </div>
                        );
                    }
                })()}

            </div>
        </div>
    );
};
