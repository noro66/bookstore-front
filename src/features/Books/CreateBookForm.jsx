import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow           from "../../ui/FormRow";
import { useCreateBook } from "./useCreateBook.js";
import { useEditBook }   from "./useEditBook.js";
import { useAuthors }    from "../../hooks/useAuthors.js";

function CreateBookForm({ BookToEdit = {} }) {
    const { _id: editId, ...editValues } = BookToEdit;
    const isEditSession = Boolean(editId);
    const {
        isPending,
        Authors,
        error,
    } = useAuthors();
    const { register, handleSubmit, reset, formState, setValue } = useForm({ defaultValues: isEditSession ? { ...editValues, publicationDate: formattedPublicationDate, } : {}, });

    const { isCreating, createBook } = useCreateBook(reset);
    const { isEditing, editBook } = useEditBook();

    const isWorking = isCreating || isEditing;
    const { errors } = formState;

    function onSubmit(data) {
        if (isEditSession) {
            editBook(
                { newBookData: data, id: editId },
                {
                    onSuccess: () => reset(),
                }
            );
        } else {
            createBook(data, {
                onSuccess: () => reset(),
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Book Title" error={errors?.title?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="title"
                    {...register("title", {
                        required: "This field is required!",
                        minLength: {
                            value: 2,
                            message: "Title must be at least 2 characters long!",
                        },
                        maxLength: {
                            value: 50,
                            message: "Title cannot exceed 50 characters.",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Book Description" error={errors?.description?.message}>
                <Textarea
                    disabled={isWorking}
                    id="description"
                    {...register("description", {
                        required: "This field is required!",
                        minLength: {
                            value: 5,
                            message: "Description must be at least 5 characters long!",
                        },
                        maxLength: {
                            value: 500,
                            message: "Description cannot exceed 500 characters.",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Publication Date" error={errors?.publicationDate?.message}>
                <Input
                    disabled={isWorking}
                    type="date"
                    id="publicationDate"
                    {...register("publicationDate", {
                        required: "This field is required!",
                    })}
                />
            </FormRow>

            <FormRow label="Genre" error={errors?.genre?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="genre"
                    {...register("genre", {
                        required: "This field is required!",
                        maxLength: {
                            value: 50,
                            message: "Genre cannot exceed 50 characters.",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Author" error={errors?.author?.message}>
                <select
                    id="author"
                    disabled={isWorking}
                    {...register("author", { required: "This field is required!" })}
                >
                    <option value="">Select Author</option>
                    {Authors?.map((author) => (
                        <option key={author['@id']} value={author['@id']}>
                            {author.firstName}
                        </option>
                    ))}
                </select>
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset" onClick={() => reset()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit Book" : "Create Book"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateBookForm;
