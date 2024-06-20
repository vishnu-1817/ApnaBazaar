import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import { count } from "console";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });

      case !category:
        return res.status(500).send({ error: "category is required" });

      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      case !photo || photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required & should be less than 1MB" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at createProductController",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).send({
      success: true,
      total: products.length,
      message: "All Products rendered",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at getProductController",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: " Product rendered",
      total: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at getSingleProductController",
      error,
    });
  }
};


////get photo
export const productPhotoController = async (req, res)=>{

    try {
        const product = await productModel.findById(req.params.pid).select("photo")

        if (product.photo.data){
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error at productPhotoProductController",
        error,
      });
    }
}
export const deleteProductController= async (req, res)=>{

    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"product delete successfully",

        })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error at deleteProductController",
        error,
      });
    }
}

export const updateProductController = async(req,res)=>{
      try {
        const { name, slug, description, price, category, quantity, shipping } =
          req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "name is required" });

          case !description:
            return res.status(500).send({ error: "description is required" });

          case !price:
            return res.status(500).send({ error: "price is required" });

          case !category:
            return res.status(500).send({ error: "category is required" });

          case !quantity:
            return res.status(500).send({ error: "quantity is required" });

          case !photo || photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is required & should be less than 1MB" });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)}, {new:true})
        
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
          success: true,
          message: "product updated successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error at updateProductController",
          error,
        });
      }
}



