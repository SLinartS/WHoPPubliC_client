import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import AssembledBlockFieldSelect from '@components/form/assembled/BlockFieldSelect';
import FormLayout from '@components/form/layout/Layout';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IOption } from '@store/category/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';

import { useChangeFieldHandler } from '../hooks/changeFieldHandler';
import { useChangeSelectHandler } from '../hooks/changeSelectHandler';

const PopupFormProductBook: FC = () => {
  const { storePopup, storeAudience, storeRegularity } = useRootStore();
  const changeFieldHandler = useChangeFieldHandler();
  const changeSelectHandler = useChangeSelectHandler();

  const currentAudienceValue = useMemo((): IOption<string> => {
    const id = Number(storePopup.form.product.getFormField('audienceId'));
    const audience = storeAudience.state.audiences.find(
      (oneAudience) => oneAudience.id === id,
    );
    if (audience) {
      return audience;
    }
    return { id, title: '', alias: '' };
  }, [
    storeAudience.status.get('fetch'),
    storePopup.form.product.getFormField('audienceId'),
  ]);

  const currentRegularityValue = useMemo((): IOption<string> => {
    const id = Number(storePopup.form.product.getFormField('regularityId'));
    const regularity = storeRegularity.state.regularities.find(
      (oneRegularity) => oneRegularity.id === id,
    );
    if (regularity) {
      return regularity;
    }
    return { id, title: '', alias: '' };
  }, [
    storeRegularity.status.get('fetch'),
    storePopup.form.product.getFormField('regularityId'),
  ]);

  function changeAudienceHandler(option: IOption<string>) {
    changeSelectHandler('audienceId', option);
  }

  function changeRegularitiesHandler(option: IOption<string>) {
    changeSelectHandler('regularityId', option);
  }

  useEffect(() => {
    storeAudience.action.fetch();
    storeRegularity.action.fetch();
  }, []);

  return (
    <FormLayout classes='magazine-info'>
      <AssembledBlockFieldSelect
        options={storeAudience.state.audiences}
        errors={storePopup.form.product.getFormErrors('audienceId')}
        changeHandler={changeAudienceHandler}
        currentOption={currentAudienceValue}
        typeForm='product'
        fieldName='audienceId'
        titleText='Аудитория'
      />
      <AssembledBlockFieldSelect
        options={storeRegularity.state.regularities}
        errors={storePopup.form.product.getFormErrors('regularityId')}
        changeHandler={changeRegularitiesHandler}
        currentOption={currentRegularityValue}
        typeForm='product'
        fieldName='regularityId'
        titleText='Регулярность'
      />
      <AssembledBlockFieldInput
        typeForm='product'
        fieldName='dateOfPrinting'
        titleText='Дата печати'
        value={storePopup.form.product.getFormField('dateOfPrinting')}
        changeHandler={changeFieldHandler}
        errors={storePopup.form.product.getFormErrors('dateOfPrinting')}
        placeholder='26.05.2022'
      />
      <AssembledBlockFieldInput
        typeForm='product'
        fieldName='printingHouse'
        titleText='Типография'
        value={storePopup.form.product.getFormField('printingHouse')}
        changeHandler={changeFieldHandler}
        errors={storePopup.form.product.getFormErrors('printingHouse')}
        placeholder='ОФСЕТ МОСКВА'
      />
      <AssembledBlockFieldInput
        typeForm='product'
        fieldName='publishingHouse'
        titleText='Издательство'
        value={storePopup.form.product.getFormField('publishingHouse')}
        changeHandler={changeFieldHandler}
        errors={storePopup.form.product.getFormErrors('publishingHouse')}
        placeholder='АСТ'
      />
    </FormLayout>
  );
};

export default observer(PopupFormProductBook);
