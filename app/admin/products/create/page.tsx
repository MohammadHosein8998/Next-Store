import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faker } from "@faker-js/faker";

const createProduction = async (FormData: FormData) => {
  "use server";
  const name = FormData.get("name") as string;
  console.log(name);
};

function createProductPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({min : 10 , max : 12})
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md ">
        <form action={createProduction}>
          <div className="mb-4">
           <FormInput name="name" type="text" label="product name" defaultValue={name}/>
          </div>
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}

export default createProductPage;
