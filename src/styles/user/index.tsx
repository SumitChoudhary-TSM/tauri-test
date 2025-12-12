import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import UserTypeSelector from './UserTypeSelector';
import AdminStep from './Admin';
import BuyerSteps from './Buyer';
import VendorSteps from './Vendor';
import CustomButton from '@/styles/button';
import { CustomDialog } from '@/styles/dialog';
import CustomStepper from '@/styles/stepper';
import PlusCircleIcon from '@/styles/icons/PlusCircleIcon';
import type { FormData, UserDialogProps } from './types';
import { RoleType } from '@/types';
import { algoOptions, stepsMap, UserRoleOptions } from '@/constants/options';
import { buyers } from '@/constants/mock-data';

export default function UserDialog({ triggerButton, initialData, onSubmit, onUpdate }: UserDialogProps) {
  const [open, setOpen] = useState(false);
  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [userType, setUserType] = useState<RoleType | null>(initialData?.role || null);
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: initialData || {},
  });

  const isEditMode = !!initialData;

  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    setUserType(initialData?.role || null);
    methods.reset(initialData || {});
  }

  const handleNext = async () => {
    let isValid = false;

    if (userType === UserRoleOptions.BUYER && activeStep === 0) {
      isValid = await methods.trigger(['name', 'email', 'password']);
    } else if (userType === UserRoleOptions.VENDOR && activeStep === 0) {
      isValid = await methods.trigger(['name', 'code', 'password']);
    } else if (userType === UserRoleOptions.MARKS_PRINT_ADMIN) {
      isValid = await methods.trigger(['name', 'email', 'password']);
    } else {
      isValid = true;
    }
    if (isValid) {
      setActiveStep((p) => p + 1);
    }
  };

  const handleBack = () => setActiveStep((p) => p - 1);

  const handleReset = () => {
    if (!isEditMode) {
      setUserType(null);
    }
    setActiveStep(0);
    methods.reset(initialData || {});
    setOpen(false);
  };

  const handleStepChange = (step: number) => {
    if (step < activeStep) {
      setActiveStep(step);
    } else if (step === activeStep + 1) {
      handleNext();
    }
  };

  const handleSubmit = async () => {
    const isValid = await methods.trigger();

    if (isValid) {
      const formData = methods.getValues();
      console.log('Form submitted:', formData);

      if (isEditMode) {
        onUpdate?.(formData);
      } else {
        onSubmit?.(formData);
      }
      alert(`${userType?.toUpperCase()} ${isEditMode ? 'Updated' : 'Created'} Successfully!`);
      handleReset();
    }
  };

  const handleUserTypeSelect = (type: RoleType) => {
    setUserType(type);
    setActiveStep(0);

    if (!isEditMode) {
      switch (type) {
        case UserRoleOptions.BUYER:
          methods.reset({
            role: type,
            name: '',
            email: '',
            password: '',
            brands: [{ name: '', startNumber: '', algo: algoOptions[0] }],
          });
          break;
        case UserRoleOptions.VENDOR:
          methods.reset({
            role: type,
            name: '',
            code: '',
            password: '',
            selectedBrands: {},
          });
          break;
        case UserRoleOptions.MARKS_PRINT_ADMIN:
          methods.reset({
            role: type,
            name: '',
            email: '',
            password: '',
          });
          break;
      }
    }
  };

  const dialogActions = userType ? (
    <div className="flex justify-between items-center w-full">
      <div>
        {activeStep > 0 ? (
          <CustomButton variantType="outline" sizeType="md" onClick={handleBack} className="border-primary">
            Back
          </CustomButton>
        ) : null}
      </div>

      <div>
        {activeStep < stepsMap[userType] - 1 ? (
          <CustomButton variantType="primary" sizeType="md" onClick={handleNext}>
            Next
          </CustomButton>
        ) : (
          <CustomButton variantType="primary" sizeType="md" onClick={handleSubmit}>
            {isEditMode ? 'Update' : 'Submit'}
          </CustomButton>
        )}
      </div>
    </div>
  ) : null;

  const dialogTitle = userType
    ? `${isEditMode ? 'Edit' : 'Create'} ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
    : 'Select User Type';

  return (
    <>
      {triggerButton ? (
        <div onClick={() => setOpen(true)}>
          {typeof triggerButton === 'string' ? (
            <CustomButton variantType="primary" sizeType="md" className="gap-2 rounded-xl">
              <PlusCircleIcon color="var(--color-primary-foreground)" />
              {triggerButton}
            </CustomButton>
          ) : (
            triggerButton
          )}
        </div>
      ) : (
        <CustomButton variantType="primary" sizeType="md" className="gap-2 rounded-xl" onClick={() => setOpen(true)}>
          <PlusCircleIcon color="var(--color-primary-foreground)" />
          {isEditMode ? 'Edit User' : 'Create User'}
        </CustomButton>
      )}

      <CustomDialog
        open={open}
        onClose={handleReset}
        title={dialogTitle}
        actions={dialogActions}
        size="sm"
        disableOutsideClick={true}
      >
        <FormProvider {...methods}>
          {userType ? (
            <>
              {userType !== UserRoleOptions.MARKS_PRINT_ADMIN ? (
                <CustomStepper
                  steps={stepsMap[userType]}
                  activeStep={activeStep}
                  onStepChange={handleStepChange}
                  width="100%"
                />
              ) : null}

              {userType === UserRoleOptions.BUYER ? (
                <BuyerSteps activeStep={activeStep} formMethods={methods} />
              ) : userType === UserRoleOptions.VENDOR ? (
                <VendorSteps activeStep={activeStep} formMethods={methods} buyers={buyers} />
              ) : userType === UserRoleOptions.MARKS_PRINT_ADMIN ? (
                activeStep === 0 ? (
                  <AdminStep formMethods={methods} />
                ) : null
              ) : null}
            </>
          ) : (
            <UserTypeSelector onSelect={handleUserTypeSelect} />
          )}
        </FormProvider>
      </CustomDialog>
    </>
  );
}
