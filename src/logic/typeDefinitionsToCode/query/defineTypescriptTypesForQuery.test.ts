import { getSqlFromFile } from '../../config/_utils/getSqlFromFile';
import { extractTypeDefinitionFromQuerySql } from '../../sqlToTypeDefinitions/query/extractTypeDefinitionFromQuerySql';
import { defineTypescriptTypesForQuery } from './defineTypescriptTypesForQuery';

describe('defineTypescriptTypesForQuery', () => {
  it('should be able to determine types accurately an example of selecting columns a single table by id', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../../__test_assets__/queries/find_image_by_id.sql` });
    const def = extractTypeDefinitionFromQuerySql({ sql });
    const code = defineTypescriptTypesForQuery({ name: 'find_image_by_id', definition: def });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately when selecting columns from multiple tables, no input variables', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../../__test_assets__/queries/select_suggestion.sql` });
    const def = extractTypeDefinitionFromQuerySql({ sql });
    const code = defineTypescriptTypesForQuery({ name: 'select_suggestion', definition: def });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately an upsert query', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../../__test_assets__/queries/upsert_suggestion.sql` });
    const def = extractTypeDefinitionFromQuerySql({ sql });
    const code = defineTypescriptTypesForQuery({ name: 'upsert_suggestion', definition: def });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this example that selects both from tables and functions', async () => {
    const sql = await getSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_users_by_last_name.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({ sql });
    const code = defineTypescriptTypesForQuery({ name: 'find_users_by_last_name', definition: def });
    expect(code).toMatchSnapshot();
  });
});
