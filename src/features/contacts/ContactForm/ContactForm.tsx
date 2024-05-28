import { FC, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from 'src/shared/ui'
import { ContactFormData, ContactFormProps } from './types'
import { ContactFormSchema } from './validator'
import { FormField } from 'src/shared/ui/FormField/FormField'
import { ContactContext } from '../ContactContext/ContactContext'
import { generateUUID } from 'src/shared/util/guid'

export const ContactForm: FC<ContactFormProps> = ({
  type,
  itemValues,
  submitCb
}) => {
  const {
    actionSuccess,
    isPending,
    actionError,
    add,
    update,
  } = useContext(ContactContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: itemValues || {
      age: undefined
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    if (type === 'edit') {
      update({
        ...data,
        id: itemValues.id
      })
      return
    }
    if (type === 'add') {
      add({
        ...data,
        id: generateUUID(),
      })
      return
    }
  }

  useEffect(() => {
    if (!itemValues && (actionSuccess || actionError)) {
      reset()
      submitCb?.()
    }
  }, [actionSuccess, itemValues, actionError, reset, submitCb])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3 w-[320px] mx-auto">
      <FormField
        type="string"
        placeholder="Name"
        name="name"
        register={register}
        error={errors.name}
        required
      />

      <FormField
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        error={errors.email}
        required
      />

      <FormField
        type="number"
        placeholder="Age"
        name="age"
        register={register}
        error={errors.age}
        min={1}
        max={120}
        setValueAs={v => v === '' ? undefined : parseInt(`${v}`)}
      />

      <FormField
        type="tel"
        name="phone"
        register={register}
        placeholder="+34-___-__-__-__"
        mask="+34-___-__-__-__"
        replacement={{ _: /\d/ }}
        error={errors.phone}
        setValueAs={v => v === '' ? undefined : v as string | number | undefined}
      />

      <Button type='submit' variant='primary' disabled={isPending}>
        {type === 'add' ? 'Add' : 'Edit'}
      </Button>
    </form>
  )
}
