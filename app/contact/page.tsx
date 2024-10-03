"use client";
import React from "react";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import ScamAlert from "@/components/ScamAlert";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import contactFormSchema, { FormValues } from "./contact.types";

function ContactUs() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (
    data: FormValues,
    event?: React.BaseSyntheticEvent<object>
  ) => {
    event?.preventDefault();
    console.log({ tr: event?.target, data });
    emailjs
      .sendForm("service_xw6j1ew", "template_xalnicn", event?.target, {
        publicKey: "AYGixZpFGEHWpsr_F",
      })
      .then((result) => {
        console.log(result.text);
        onOpen();
        reset();
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  return (
    <div className=" bg-background">
      <section className="flex flex-wrap items-center justify-between pb-12 overflow-hidden bg-background bg-[url('/layout/net.png')]">
        {/* Image */}
        <div className="w-full md:w-1/2 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.2191421732014!2d-80.00796434127807!3d40.536747384243434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88348ca7c6f419a1%3A0x2410b8c130451f23!2s3202%20McKnight%20E%20Dr%2C%20Pittsburgh%2C%20PA%2015237%2C%20USA!5e0!3m2!1sen!2sng!4v1727984212927!5m2!1sen!2sng"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* Text */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 px-8 md:px-12 2xl:px-14">
          <span className="bg-primary/30 rounded-full text-black dark:text-white  px-4 py-2 ">
            Proud and Passionate
          </span>
          <h2 className="text-3xl font-bold mt-4 ">Work With Us</h2>
          <div className="border-l-3 border-primary pl-4 my-4">
            If you have any questions or need assistance, just fill out the
            contact form, and we’ll reach out to you shortly. Got feedback? Send
            us a message and share your thoughts!
          </div>
          <div className="my-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-3">
                <Input
                  label="First Name"
                  variant="bordered"
                  labelPlacement="outside"
                  color="primary"
                  placeholder="Jane"
                  {...register("firstName")}
                  isInvalid={!!errors?.firstName?.message}
                  errorMessage={errors?.firstName?.message}
                />
              </div>
              <div className="py-3">
                <Input
                  label="Last Name"
                  variant="bordered"
                  color="primary"
                  labelPlacement="outside"
                  placeholder="Doe"
                  {...register("lastName")}
                  isInvalid={!!errors?.lastName?.message}
                  errorMessage={errors?.lastName?.message}
                />
              </div>
              <div className="py-3">
                <Input
                  label="Email"
                  variant="bordered"
                  color="primary"
                  labelPlacement="outside"
                  type="email"
                  placeholder="janedoe@outsource.com"
                  {...register("email")}
                  isInvalid={!!errors?.email?.message}
                  errorMessage={errors?.email?.message}
                />
              </div>
              <div className="py-3">
                <Input
                  label="subject"
                  variant="bordered"
                  color="primary"
                  labelPlacement="outside"
                  placeholder="subject"
                  {...register("subject")}
                  isInvalid={!!errors?.subject?.message}
                  errorMessage={errors?.subject?.message}
                />
              </div>

              <div className="my-2">
                <Textarea
                  label="Message"
                  variant="bordered"
                  color="primary"
                  labelPlacement="outside"
                  placeholder="Message"
                  {...register("content")}
                  isInvalid={!!errors?.content?.message}
                  errorMessage={errors?.content?.message}
                />
              </div>
              <Button type="submit" color="primary" radius="full">
                Get in Touch
              </Button>
            </form>
          </div>
        </div>
      </section>

      <ScamAlert />
      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thank You
              </ModalHeader>
              <ModalBody>
                <p className="text-center">
                  Thank you for your message. We will respond to you shortly.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ContactUs;
