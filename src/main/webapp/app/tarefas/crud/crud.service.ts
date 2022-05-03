import axios from 'axios';

const baseApiUrl = 'api/tarefas/crud';

export default class CrudService {
  // TODO: implementar GET
  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  // TODO: implementar POST

  // TODO: implementar PUT

  // TODO: implementar DELETE
}
