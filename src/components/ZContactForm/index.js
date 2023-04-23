import React from "react";
import cn from "classnames";
import styles from "./Form.module.sass";
import Icon from "../Icon";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const ContactForm = ({
  className,
  onSubmit,
  placeholder,
  value,
  setValue,
  type,
  name,
}) => {
  return (
    <>
      {/*
    <form className={cn(styles.form, className)} action="" onSubmit={onSubmit}>
      <input
        className={styles.input}
        type={type}
        value={value}
        //onChange={(e) => setValue(e.target.value)}
        name={name}
        placeholder={placeholder}
        required
      />

      <button className={styles.btn}>
        <Icon name="arrow-next" size="14" />
      </button>
    </form>
    */}
      <Form>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            type="name"
            name="name"
            id="Name"
            placeholder="Your Name"
            className={styles.textInput}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            type="email"
            name="email"
            id="Email"
            placeholder="example@email.com"
            className={styles.textInput}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Label for="Topic">Topic</Label>
          <Input
            type="topic"
            name="topic"
            id="Topic"
            placeholder="Topic, Subject, or Category"
            className={styles.textInput}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Label for="Message">Message</Label>
          <Input
            type="textarea"
            name="message"
            id="Message"
            placeholder="Type your message here"
            className={cn(styles.msg, styles.textInput)}
          />
        </FormGroup>

        <br />
        <br />

        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default ContactForm;
