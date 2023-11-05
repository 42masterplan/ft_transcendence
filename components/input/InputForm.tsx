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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
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
