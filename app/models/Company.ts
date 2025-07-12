import mongoose,{Schema,model, models} from "mongoose";

export interface ICompany {
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    description: string
    website: string
    logo: string
    location: string
    industry: string
}
 

 const companySchema = new Schema<ICompany>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
  }, {timestamps: true});
  
  export const Company = models?.Company || model<ICompany>("Company", companySchema);