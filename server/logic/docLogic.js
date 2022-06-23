import docTable from '../schema/dbTables.js'

export const getDocument = async (id) => {

    if( id === null) return;

    const docTBL = await docTable.findById(id);

    if(docTBL) return docTBL;
    return await docTable.create({_id: id, content:""});

}

export const updateDocument = async(id, content) => {
    return await docTable.findByIdAndUpdate(id, {content});
}
