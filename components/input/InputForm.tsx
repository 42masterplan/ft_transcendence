'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '../shadcn/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcn/ui/form';
import {Input} from '../shadcn/ui/input';
import {toast} from '../shadcn/ui/use-toast';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: '닉네임은 최소 2자리 이상이여야 합니다.'
  })
});

interface InputFormProps {
  label: string;
  placeholder: string;
  buttonLabel: string;
  className?: string;
}

export function InputForm({label, placeholder, buttonLabel}: InputFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });
<<<<<<< Updated upstream:components/input/InputForm.tsx

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
=======
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      const response = await fetch('/users/hasDuplicateName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorData = await response.json();
        form.setError('username', {
          type: 'manual',
          message: '이미 사용중인 이름입니다.'
        });
      }
    } catch (error) {
      console.error('Error during the fetch operation:', error);
      form.setError('username', {
        type: 'manual',
        message: '서버 에러가 발생했습니다.'
      });
    }
>>>>>>> Stashed changes:frontend/src/components/input/InputForm.tsx
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 grid'>
        <FormField
          control={form.control}
          name='username'
          render={({field}) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{buttonLabel}</Button>
      </form>
    </Form>
  );
}
