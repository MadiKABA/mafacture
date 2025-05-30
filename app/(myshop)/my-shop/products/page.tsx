"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, Plus, Tags, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Toolbar } from "primereact/toolbar";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { FileUpload } from "primereact/fileupload";
import { Badge } from "primereact/badge";
import { Product } from "@/type";
import {
    createProduct,
    getProductsByShop,
    updateProduct,
    deleteProduct as deleteProductFromDb,
    createCategory,
    getCategoriesByShop,
} from "@/app/actions";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyProduct: Product = {
    id: "",
    name: "",
    price: 0,
    quantity: 0,
    barcode: "",
    imageUrl: "",
    categoryId: "",
    shopId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: { id: "", name: "", shopId: "" },
};
type Category = {
    id: string;
    name: string;
    shopId: string;
};

export default function ProductsPage() {
    const [selectedShop, setSelectedShop] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const [globalFilter, setGlobalFilter] = useState<string>("");

    const [categories, setCategories] = useState<Category[]>([]);

    const [categoryDialog, setCategoryDialog] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [product, setProduct] = useState<Product>(emptyProduct);
    const [imageFile, setImageFile] = useState<File | null>(null);


    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Product[]>>(null);
    const fileUploadRef = useRef<FileUpload>(null);

    useEffect(() => {
        if (selectedShop) {
            setLoading(true);
            Promise.all([
                getProductsByShop(selectedShop),
                getCategoriesByShop(selectedShop)
            ])
                .then(([productsData, categoriesData]) => {
                    setProducts(productsData);
                    setCategories(categoriesData);
                })
                .finally(() => setLoading(false));
        }
    }, [selectedShop, refreshKey]);

    const openNew = () => {
        setProduct({ ...emptyProduct, shopId: selectedShop || "" });
        setProductDialog(true);
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
    };

    const hideDialog = () => {
        setProductDialog(false);
        setImageFile(null);
    };

    const saveProduct = async () => {
        if (!product.name.trim()) {
            toast.current?.show({
                severity: "error",
                summary: "Erreur",
                detail: "Le nom du produit est requis",
                life: 3000,
            });
            return;
        }

        try {
            let imageUrl = product.imageUrl;

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("upload_preset", "product_photos");

                const response = await fetch("https://api.cloudinary.com/v1_1/dlebhesqu/image/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                imageUrl = data.secure_url;
            }

            if (!product.id) {
                await createProduct({
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    imageUrl: imageUrl ?? undefined,
                    barcode: product.barcode || undefined,
                    categoryId: product.categoryId,
                    shopId: product.shopId,
                });
            } else {
                await updateProduct(product.id, {
                    name: product.name,
                    price: product.price,
                    imageUrl: imageUrl ?? undefined,
                    barcode: product.barcode || undefined,
                    categoryId: product.categoryId,
                });
            }

            toast.current?.show({
                severity: "success",
                summary: "Succès",
                detail: product.id ? "Produit modifié" : "Produit ajouté",
                life: 3000,
            });

            setRefreshKey((prev) => prev + 1);
            setProductDialog(false);
            setImageFile(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.current?.show({
                    severity: "error",
                    summary: "Erreur",
                    detail: err.message || "Une erreur est survenue",
                    life: 5000,
                });
            }
        }
    };

    const deleteProduct = async (product: Product) => {
        try {
            await deleteProductFromDb(product.id);
            toast.current?.show({
                severity: "success",
                summary: "Succès",
                detail: "Produit supprimé",
                life: 3000
            });
            setRefreshKey((prev) => prev + 1);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.current?.show({
                    severity: "error",
                    summary: "Erreur",
                    detail: err.message || "Échec de la suppression",
                    life: 5000,
                });
            }
        }
    };

    const actionBodyTemplate = (rowData: Product) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                rounded
                outlined
                severity="secondary"
                tooltip="Modifier"
                tooltipOptions={{ position: 'top' }}
                onClick={() => {
                    setProduct({ ...rowData });
                    setProductDialog(true);
                }}
            />
            <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                tooltip="Supprimer"
                tooltipOptions={{ position: 'top' }}
                onClick={() => deleteProduct(rowData)}
            />
        </div>
    );

    const priceBodyTemplate = (rowData: Product) => (
        <span className="font-bold text-primary">{rowData.price.toLocaleString("fr-FR")} FCFA</span>
    );

    const quantityBodyTemplate = (rowData: Product) => (
        <Badge
            value={rowData.quantity}
            severity={rowData.quantity > 10 ? "success" : rowData.quantity > 0 ? "warning" : "danger"}
            className="text-sm"
        />
    );

    const categoryBodyTemplate = (rowData: Product) => (
        <Tag
            value={rowData.category?.name || "Non catégorisé"}
            icon="pi pi-tag"
            className="text-sm"
            severity="info"
        />
    );

    const imageBodyTemplate = (rowData: Product) => (
        rowData.imageUrl ? (


            <Image
                src={rowData.imageUrl}
                alt={rowData.name}
                width={48}
                height={48}
                className="rounded-lg shadow-md object-cover border"
            />

        ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <i className="pi pi-image text-gray-400" />
            </div>
        )
    );

    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button
                onClick={openNew}
                variant="success" // personnalisé via Tailwind si besoin
                className="bg-green-800 hover:bg-green-700 text-white"
            >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau produit
            </Button>

            <Button
                onClick={() => setCategoryDialog(true)}
                variant="secondary"
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
                <Tags className="mr-2 h-4 w-4" />
                Nouvelle catégorie
            </Button>
        </div>
    );

    return (
        <>
            <Toast ref={toast} position="top-right" />

            <div className="">
                <div className="col-12">
                    <Card className="shadow-2 border-round-lg">
                        <Toolbar
                            className="mb-4 px-0"
                            right={leftToolbarTemplate}
                        />

                        {loading ? (
                            <div className="flex justify-content-center align-items-center py-8">
                                <ProgressSpinner
                                    strokeWidth="4"
                                    animationDuration=".5s"
                                    className="w-2rem h-2rem"
                                />
                                <span className="ml-3">Chargement des produits...</span>
                            </div>
                        ) : (
                            <DataTable
                                ref={dt}
                                value={products}
                                selection={selectedProducts}
                                onSelectionChange={(e) => setSelectedProducts(e.value as Product[])}
                                selectionMode="multiple"
                                dataKey="id"
                                paginator
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                globalFilter={globalFilter}
                                stripedRows
                                showGridlines
                                className="p-datatable-sm px-5"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} produits"
                                emptyMessage="Aucun produit trouvé"
                                header={
                                    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
                                        <h3 className="m-0 text-2xl font-semibold me-5">Gestion des produits</h3>
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-search" />
                                            <Input
                                                type="search"
                                                placeholder="Rechercher..."
                                                onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                                                className="w-full"
                                            />
                                        </span>
                                    </div>
                                }
                            >
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                                <Column field="name" header="Nom" sortable style={{ minWidth: '16rem' }} />
                                <Column field="price" header="Prix" body={priceBodyTemplate} sortable style={{ minWidth: '10rem' }} />
                                <Column field="quantity" header="Quantité" body={quantityBodyTemplate} sortable style={{ minWidth: '10rem' }} />
                                <Column header="Catégorie" body={categoryBodyTemplate} style={{ minWidth: '12rem' }} />
                                <Column header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem', textAlign: 'center' }} />
                                <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
                            </DataTable>
                        )}
                    </Card>
                </div>
            </div>

            {/* Product Dialog */}
            <Dialog open={productDialog} onOpenChange={hideDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{product.id ? "Modifier le produit" : "Nouveau produit"}</DialogTitle>
                    </DialogHeader>

                    <form className="space-y-4 px-1">
                        {/* Nom du produit */}
                        <div className="space-y-1">
                            <Label htmlFor="name">
                                Nom du produit <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                className={!product.name ? "border-red-500" : ""}
                                required
                            />
                        </div>

                        {/* Prix */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="price">
                                    Prix (FCFA) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                                    required
                                />
                            </div>

                            {/* Quantité */}
                            <div className="space-y-1">
                                <Label htmlFor="quantity">Quantité</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) || 0 })}
                                    min={0}
                                />
                            </div>
                        </div>

                        {/* Code-barre */}
                        <div className="space-y-1">
                            <Label htmlFor="barcode">Code barre</Label>
                            <Input
                                id="barcode"
                                value={product.barcode || ""}
                                onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
                            />
                        </div>

                        {/* Upload d'image */}
                        <div className="space-y-1">
                            <Label htmlFor="image">Image du produit</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            />
                            {(imageFile || product.imageUrl) && (
                                <img
                                    src={imageFile ? URL.createObjectURL(imageFile) : product.imageUrl || ""}
                                    alt="Aperçu"
                                    className="w-32 h-32 object-cover rounded-md border mt-2"
                                />
                            )}
                        </div>

                        {/* Catégorie */}
                        <div className="space-y-1">
                            <Label htmlFor="category">Catégorie</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={product.categoryId}
                                    onValueChange={(value) => setProduct({ ...product, categoryId: value })}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="p-2"
                                    onClick={() => setCategoryDialog(true)}
                                >
                                    <Plus size={18} />
                                </Button>
                            </div>
                        </div>
                    </form>

                    <DialogFooter>
                        <Button variant="ghost" onClick={hideDialog}>
                            <X className="mr-2 h-4 w-4" /> Annuler
                        </Button>
                        <Button onClick={saveProduct} className="bg-green-600 hover:bg-green-700 text-white">
                            <Check className="mr-2 h-4 w-4" /> Enregistrer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Category Dialog */}
            <Dialog open={categoryDialog} onOpenChange={setCategoryDialog}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Nouvelle catégorie</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="categoryName" className="font-medium">
                                Nom de la catégorie <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="categoryName"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setCategoryDialog(false)}>
                            Annuler
                        </Button>
                        <Button
                            onClick={async () => {
                                if (newCategoryName.trim() && selectedShop) {
                                    try {
                                        const newCat = await createCategory({
                                            name: newCategoryName,
                                            shopId: selectedShop,
                                        });
                                        setCategories((prev) => [...prev, newCat]);
                                        setProduct((prev) => ({ ...prev, categoryId: newCat.id }));
                                        toast.current?.show({
                                            severity: "success",
                                            summary: "Succès",
                                            detail: "Catégorie ajoutée",
                                            life: 3000,
                                        });
                                        setNewCategoryName("");
                                        setCategoryDialog(false);
                                    } catch (err: unknown) {
                                        if (err instanceof Error) {
                                            toast.current?.show({
                                                severity: "error",
                                                summary: "Erreur",
                                                detail: err.message || "Échec de la création",
                                                life: 5000,
                                            });
                                        }
                                    }
                                }
                            }}
                            disabled={!newCategoryName.trim()}
                        >
                            Ajouter
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    );
}